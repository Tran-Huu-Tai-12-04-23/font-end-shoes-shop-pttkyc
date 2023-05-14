import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../components/Button";

function ViewOrder({ show, handleNext = () => {} }) {
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
              <span className="text-orange-400 font-bold ml-2">
                Tran Huu Tai
              </span>
            </h5>
            <h5 className="mt-5 text-xl ">
              Phone number :{" "}
              <span className="text-orange-400 font-bold ml-2">0376100548</span>
            </h5>
            <h5 className="mt-5 text-xl ">
              Email :{" "}
              <span className="text-orange-400 font-bold ml-2">
                huutaitran201@gmail.com
              </span>
            </h5>
            <h5 className="mt-5 text-xl ">
              Receiving address :
              <span className="text-orange-400 font-bold ml-2">
                Binh dinh, my chau , phu my, 30/38 nga ba tam tuong
              </span>
              <h5 className="mt-5 text-xl ">
                Total :
                <span className="text-orange-400 font-bold ml-2">$ 45</span>
              </h5>
            </h5>
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
            onClick={handleNext}
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
