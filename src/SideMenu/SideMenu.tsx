import { useSelector, useDispatch } from "react-redux";
import { getSideMenuItems } from "../store/sideMenuReducer";
import { useEffect } from "react";
import { menuActions } from "../store/sideMenuReducer";
import css from "./styles.module.css";

export const SideMenu: React.FC = () => {
  const sideMenuItems = useSelector(getSideMenuItems);
  const dispatch = useDispatch();
  const fetchSideMenuItems = menuActions.fetchSideMenuItems;

  useEffect(() => {
    dispatch(fetchSideMenuItems());
  }, [dispatch, fetchSideMenuItems]);

  return (
    <ul className={css.sideMenu}>
      {sideMenuItems.map((item) => (
        <li key={item.label}>{item.label}</li>
      ))}
    </ul>
  );
};
