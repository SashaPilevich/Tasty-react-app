import { SetStateAction, useEffect, useState } from "react";
import { Button } from "../Button";
import { Container } from "../Container";
import { Header } from "../Header";
import style from "./style.module.css";

export const MyShoppingList = () => {
  const [shopList, setShopList] = useState<string[]>([]);
  let shopArray = [];
  let isList = localStorage.getItem("shopList");

  useEffect(() => {
    if (isList) {
      shopArray = JSON.parse(isList);
      shopArray = shopArray.map((item: string[]) => {
        return item;
      });
      setShopList(shopArray);
    }
  }, []);
  const clickDelete = (ingredient: string) => {
    const newList: string[] | undefined = shopList?.filter((item) => {
      return item !== ingredient;
    });
    setShopList(newList);
    localStorage.setItem("shopList", JSON.stringify(newList));
  };

  let myShopList: string[] = [];
  let itemForShopList = localStorage.getItem("shopList");
  if (itemForShopList) {
    myShopList = JSON.parse(itemForShopList);
  }
  return (
    <Container>
      <Header />
      <h2 className={style.title}>My shopping list</h2>
      {shopList.map((item) => {
        const deleteItem = () => {
          clickDelete(item);
        };
        return (
          <div className={style.container}>
            <p className={style.ingredientsItem}>{item}</p>
            <Button label="X" onClick={deleteItem} type="btnDelete" />
          </div>
        );
      })}
      <Button label={"BUY"} onClick={() => {}} type="btnShop" />
    </Container>
  );
};
