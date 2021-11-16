import { useSelector, useDispatch } from "react-redux";
import { getSideMenuItems } from "../store/categoriesReducer";
import { useEffect } from "react";
import { menuActions } from "../store/categoriesReducer";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import css from "./styles.module.css";

export const SideMenu: React.FC = () => {
  const sideMenuItems = useSelector(getSideMenuItems);
  const dispatch = useDispatch();
  const fetchCategoryItems = menuActions.fetchCategoryItems;

  useEffect(() => {
    dispatch(fetchCategoryItems());
  }, [dispatch, fetchCategoryItems]);

  return (
    <Menu className={css.sideMenu}>
      {sideMenuItems.map((item) => (
        <Menu.Item key={item.id}>
          <Link to="./">{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};
