import Banner from "@/components/Banner";
import Membership from "@/components/Membership";
import WorkoutPlan from "@/components/WorkoutPlan";

export default function Home() {
  return (
    <div className=" space-y-4 ">
     <Banner></Banner>
     <WorkoutPlan></WorkoutPlan>
     <Membership></Membership>
    </div>
  );
}
