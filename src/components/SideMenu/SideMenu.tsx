import { useSelector, useDispatch } from "react-redux";
import { getSideMenuItems } from "../../store/categoriesReducer";
import { useEffect } from "react";
import { menuActions } from "../../store/categoriesReducer";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import css from "./styles.module.css";
import { getLoadStatusMenu } from "../../store/categoriesReducer";
import { LOAD_STATUSES } from "../../store/constatns";
import { Loader } from "../Loader";

export const SideMenu: React.FC = () => {
  const sideMenuItems = useSelector(getSideMenuItems);
  const dispatch = useDispatch();
  const fetchCategoryItems = menuActions.fetchCategoryItems;
  const loadStatusMenu = useSelector(getLoadStatusMenu);

  useEffect(() => {
    dispatch(fetchCategoryItems());
  }, [dispatch, fetchCategoryItems]);

  return (
    <Menu className={css.sideMenu}>
      {loadStatusMenu === LOAD_STATUSES.LOADING && <Loader />}
      {loadStatusMenu === LOAD_STATUSES.SUCCESS &&
        sideMenuItems.map((item) => (
          <Menu.Item key={item.id}>
            <Link to={item.type}>{item.label}</Link>
          </Menu.Item>
        ))}
      {loadStatusMenu === LOAD_STATUSES.FAILURE && (
        <div>Ошибка, попробуйте перегрузить страницу</div>
      )}
    </Menu>
  );
};
