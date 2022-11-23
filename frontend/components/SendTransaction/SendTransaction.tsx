import { utils } from "ethers";
import * as React from "react";
import { useDebounce } from "use-debounce";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";

import Button from "../Button";

interface Props {
  donationAmount: number;
  address: string;
}

const SendTransaction: React.FC<Props> = ({ donationAmount, address }) => {
  const recipientAddress = "0x8410b7d9b970EaE8572ce0eAC3585B3ada93E1d1";
  const [debouncedTo] = useDebounce(recipientAddress, 500);

  const amount = donationAmount.toString();
  const [debouncedValue] = useDebounce(amount, 500);

  const { config } = usePrepareSendTransaction({
    request: {
      from: address,
      to: debouncedTo,
      value: debouncedValue ? utils.parseEther(debouncedValue) : undefined,
    },
  });
  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleSendTransaction = () => {
    sendTransaction?.();
    console.log("transaction is being send");
    console.log("amount", amount);
    console.log("address", address);
  };
  return (
    <>
      <Button
        title={isLoading ? "Sending..." : "Send"}
        onClick={handleSendTransaction}
      />
      {isSuccess && (
        <div>
          Successfully sent {amount} ether to {recipientAddress}
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </>
  );
};

export default SendTransaction;
