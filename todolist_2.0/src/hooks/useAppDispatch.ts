import {useDispatch} from "react-redux";
import {AppDispatch} from "../State/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();