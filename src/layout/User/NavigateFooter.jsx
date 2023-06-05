const NavigateFooter = ({ nav, active }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-blur">
      <ul className={`flex center `}>
        {nav.map((n, index) => {
          return (
            <li
              key={index}
              onClick={n.action}
              className={`${
                active === index ? "text-orange-400 " : ""
              } flex font-barlow w-1/${
                nav.length
              } font-bold flex-col items-center justify-center`}
            >
              <span>{n.icon}</span>
              <span>{n.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default NavigateFooter;
