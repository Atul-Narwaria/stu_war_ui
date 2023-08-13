import { FaBook, FaStar, FaUser } from "react-icons/fa";
import BasicCardIcon from "../../components/cards/BasicCardIcon";

export default function Home() {
  const topCard = [
    { title: "Total Question", count: "530", icon: FaStar },
    { title: "Total Cordinators", count: "23", icon: FaUser },
    { title: "Total Teacher", count: "45", icon: FaUser },
    { title: "Total E-books", count: "50", icon: FaBook },
  ];

  return (
    <>
      <section className={`   flex flex-col lg:flex-row  gap-7 justify-around`}>
        {topCard.map((item: any, index: number) => (
          <div key={index} className="  bg-white shadow-lg rounded-lg">
            <BasicCardIcon
              title={item.title}
              icon={item.icon}
              count={item.count}
            />
          </div>
        ))}
      </section>
    </>
  );
}
