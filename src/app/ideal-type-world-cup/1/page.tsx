import FoodGame, { Candidate } from "./gameComponent";

const candidates11 = [
  {
    id: 1,
    name: "햄버거",
    imageUrl: "https://source.unsplash.com/1600x900/?burger",
  },
  {
    id: 2,
    name: "볶음밥",
    imageUrl: "https://source.unsplash.com/1600x900/?friedrice",
  },
  {
    id: 3,
    name: "파스타",
    imageUrl: "https://source.unsplash.com/1600x900/?pasta",
  },
  {
    id: 4,
    name: "라면",
    imageUrl: "https://source.unsplash.com/1600x900/?ramen",
  },
];

const candidates = [
  { id: 1, name: "후보자 1", imageUrl: "https://via.placeholder.com/150" },
  { id: 2, name: "후보자 2", imageUrl: "https://via.placeholder.com/150" },
  { id: 3, name: "후보자 3", imageUrl: "https://via.placeholder.com/150" },
  { id: 4, name: "후보자 4", imageUrl: "https://via.placeholder.com/150" },
];

const App: React.FC = () => {
  return (
    <div>
      <FoodGame candidates={candidates} />
    </div>
  );
};

export default App;
