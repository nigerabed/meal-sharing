
import MealList from "../../components/MealsList/MealList";

export default async function Meals({searchParams}) {
const searchedMeal = await (searchParams).search || "";


    return(
        <MealList search = {searchedMeal}/>
    )
}