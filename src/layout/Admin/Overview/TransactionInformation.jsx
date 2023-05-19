import SubTransaction from "../Transaction/SubTransaction";

function TransactionInformation() {
  return (
    <div className="flex flex-col w-full p-4 rounded-xl ">
      <h1 className="font-barlow font-bold text-xl">Transaction's</h1>

      <div className="flex flex-col">
        <SubTransaction data={[]}></SubTransaction>
        <SubTransaction data={[]}></SubTransaction>
        <SubTransaction data={[]}></SubTransaction>
        <SubTransaction data={[]}></SubTransaction>
        <SubTransaction data={[]}></SubTransaction>
        <SubTransaction data={[]}></SubTransaction>
      </div>
    </div>
  );
}

export default TransactionInformation;
