import { Table, Pagination } from "antd";
import css from "./styles.module.css";
import { debounce } from "lodash";
import { Input, Select, Slider } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { goodsAction, goodsSelectors } from "../../store/goodsReducer";
import {
  CategoryType,
  sideMenuSelectors,
  menuActions,
} from "../../store/categoriesReducer";
import { useNavigate } from "react-router";
import { Loader } from "../Loader";
import { LOAD_STATUSES } from "../../store/constatns";
import type { GoodsCardType } from "../../store/goodsReducer";
import { LINKS } from "../App";

interface FiltersType {
  limit: string;
  offset: string;
  text: string;
  categoryTypeIds: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  sortDirection: string;
}

export const GoodsTablePage = () => {
  const [page, setPage] = useState(3);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<FiltersType>({
    limit: "",
    offset: "",
    text: "",
    categoryTypeIds: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    sortDirection: "",
  });

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const getParams = (obj: any) => {
    let newObj: any = {};
    for (let key in obj) {
      if (obj[key]) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };

  const getDataFilter = (filtersToFetch: FiltersType) => {
    const queryParams = getParams(filtersToFetch);
    const searchParams = new URLSearchParams(queryParams).toString();
    dispatch(goodsAction.fetchGoods(searchParams));
  };
  const memoizedFilter = useCallback(debounce(getDataFilter, 1500), []);
  const categoriesItems: CategoryType[] = useSelector(sideMenuSelectors.getSideMenuItems);

  useEffect(() => {
    if (!categoriesItems[1]) {
      dispatch(menuActions.fetchCategoryItems(""));
    }
    memoizedFilter(filters);
  }, [memoizedFilter, filters, categoriesItems, dispatch]);

  const dataGoods: GoodsCardType[] = useSelector(goodsSelectors.getGoodsItems);
  const totalItems: number = useSelector(goodsSelectors.getTotalGoodsItems);
  const pageStatus = useSelector(goodsSelectors.getGoodsLoadStatus);
  const maks = { 0: "0", 100: "100х10" };

  const setSort = (sortBy: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy,
      sortDirection: prevFilters.sortDirection === "asc" ? "desc" : "asc",
    }));
  };

  const handlerFilterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      text: e.target.value,
      offset: "0",
      limit: "10",
    });
  };

  const handlerFilterCategory = (value: string) => {
    setFilters({
      ...filters,
      categoryTypeIds: value,
      offset: "0",
      limit: "10",
    });
  };

  const handlerFilterPrice = (value: number[]) => {
    setFilters({
      ...filters,
      minPrice: String(value[0] * 10),
      maxPrice: String(value[1] * 10),
      offset: "0",
      limit: "10",
    });
  };

  const handlerPagination = (page: number, pageSize: number | undefined) => {
    setPage(page);
    if (pageSize) {
      setFilters({
        ...filters,
        limit: String(pageSize),
        offset: String((page - 1) * pageSize),
      });
      setPageSize(pageSize);
    }
  };

  const columns = [
    {
      title: "Категория",
      dataIndex: "type",
      width: 150,
    },
    {
      title: "Товар",
      dataIndex: "label",
      width: 150,
      sorter: true,
      onHeaderCell: () => {
        return {
          onClick: () => {
            setSort("label");
          },
        };
      },
    },
    {
      title: "Цена",
      dataIndex: "price",
      width: 150,
      sorter: true,
      onHeaderCell: () => {
        return {
          onClick: () => {
            setSort("price");
          },
        };
      },
    },
  ];

  return (
    <div className={css.tablePage}>
      <div className={css.filters}>
        <p className={css.filtersTitle}>Параметры поиска:</p>
        <div className={css.filterItem}>
          <label className={css.titleItem}>По товару:</label>
          <Input value={filters.text} onChange={handlerFilterText} />
        </div>
        <div className={css.filterItem}>
          <label className={css.titleItem}>По категории:</label>
          <Input.Group>
            <Select
              defaultValue="Категории товаров"
              style={{ width: "70%" }}
              onChange={handlerFilterCategory}
            >
              {categoriesItems.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Input.Group>
        </div>
        <div className={css.filterItem}>
          <label className={css.titleItem}>По цене:</label>
          <Slider
            marks={maks}
            range
            step={1}
            defaultValue={[20, 50]}
            onChange={handlerFilterPrice}
          />
        </div>
      </div>
      <div className={css.table}>
        {pageStatus === LOAD_STATUSES.LOADING && <Loader />}
        {pageStatus === LOAD_STATUSES.SUCCESS && (
          <div>
            <Table
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={dataGoods}
              pagination={false}
              onRow={(record) => {
                return {
                  onClick: () => {
                    navigate(LINKS.product + "/" + record.id);
                  },
                };
              }}
            />
            <Pagination
              onChange={handlerPagination}
              total={totalItems}
              current={page}
              pageSize={pageSize}
            />
          </div>
        )}
        {pageStatus === LOAD_STATUSES.FAILURE && (
          <div className={css.error}>Ошибка, попробуйте позже</div>
        )}
      </div>
    </div>
  );
};
