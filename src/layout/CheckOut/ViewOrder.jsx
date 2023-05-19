import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../components/Button";

function ViewOrder({
  checkOut,
  show,
  handleNext = () => {},
  name,
  phoneNumber,
  email,
  address,
  specStreet,
  total,
}) {
  const history = useNavigate();
  return (
    <>
      <div
        className=" w-full center flex left-0 right-0 "
        style={{
          transition: "1s",
          position: show ? "" : "fixed",
          transform: show ? "" : "translateY(-200%)",
          opacity: show ? "1" : "0",
          zIndex: 0,
        }}
      >
        <div className="xl:w-4/6 w-full center flex flex-col mt-4 p-4 rounded-xl bg-slate-200">
          <h5
            className="text-2xl font-barlow font-bold"
            style={{
              borderBottom: "2px solid #ccc",
            }}
          >
            Order Information
          </h5>
          <div className="w-full text- flex font-barlow flex-col">
            <h5 className="mt-5 text-xl ">
              User order :{" "}
              <span className="text-orange-400 font-bold ml-2">{name}</span>
            </h5>
            <h5 className="mt-5 text-xl ">
              Phone number :{" "}
              <span className="text-orange-400 font-bold ml-2">
                {phoneNumber}
              </span>
            </h5>
            <h5 className="mt-5 text-xl ">
              Email :{" "}
              <span className="text-orange-400 font-bold ml-2">{email}</span>
            </h5>
            <div className="mt-5 text-xl ">
              Receiving address :
              <span className="text-orange-400 font-bold ml-2">
                {address + "," + specStreet}
              </span>
              <h5 className="mt-5 text-xl ">
                Total :
                <span className="text-orange-400 font-bold ml-2">
                  $ {total}
                </span>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div
        className="fixed  flex center w-full bottom-0 left-0 right-0 "
        style={{
          transition: "1s",
          position: show ? "" : "fixed",
          transform: show ? "" : "translateY(200%)",
          opacity: show ? "1" : "0",
          zIndex: 0,
        }}
      >
        <div className="rounded-xl p-10 flex flex-col bg-slate-200">
          <ButtonCustom
            nameButton="Commit Order"
            style={{ color: "#ffff", background: "var(--linear)" }}
            onClick={async (e) => {
              const res = await checkOut();

              if (res === true) {
                handleNext();
                history("/bag");
              }
            }}
          />
          <ButtonCustom
            nameButton="Choose another items"
            style={{
              marginTop: "2rem",
            }}
            onClick={(e) => history("/bag")}
          />
        </div>
      </div>
    </>
  );
}

export default ViewOrder;
