import Billing from "../Order/Billing";
import { v4 as uuid } from "uuid";

function BillingInformation({ orderRecently }) {
  return (
    <div className="w-full flex flex-col p-4 rounded-xl bg-slate-50 mb-10">
      <h1 className="text-xl font-barlow font-bold p-2 ">
        Billing Information
      </h1>
      {orderRecently.map((bill) => {
        return (
          <Billing
            key={uuid()}
            data={bill}
            style={{
              borderBottom: "1px solid #ccc",
              backgroundColor: "rgba(0,0,0,.1)",
              backdropFilter: "blur(2rem)",
              marginTop: "2rem",
            }}
          />
        );
      })}
    </div>
  );
}

export default BillingInformation;
