"use client";

import { addFavoriteCity, addFavoriteCrypto, removeFavoriteCity, removeFavoriteCrypto } from "@/lib/redux/features/favorites/myFavoritesSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { Heart } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Favorite = ({category, data}:{ category : string , data:any}) => {

    const myFavorites = useSelector(( store : RootState) => store.myFavorites)
    let isPresent : any = false ;
    if(category === "cities"){
        isPresent = !!myFavorites.cities.find(city => city.id === data.id);
    }else{
       isPresent = !!myFavorites.crypto.find(crypto => crypto.id === data.id);
    }

  const [favorite, setFavorite] = useState(isPresent);
  console.log(favorite)

  const dispatch = useDispatch<AppDispatch>()

  const handleChange = () => {
    toast.dismiss();
    console.log("Key value:", category);
    console.log("Data being dispatched:", data);

    if(!favorite){
        
        switch (category){
            case "cities" : 
                dispatch(addFavoriteCity(data))
                toast.success("Add favorite city")
                break;
            case "crypto" :
                dispatch(addFavoriteCrypto(data))
                toast.success("Add favorite crypto")
                break;
        }
    }else{
        switch (category){
            case "cities" : 
                dispatch(removeFavoriteCity(data.id))
                toast.success("Remove favorite city")
                break;
            case "crypto" :
                dispatch(removeFavoriteCrypto(data.id))
                toast.success("Remove favorite crypo")
                break;
        }

    }

    setFavorite(!favorite)
} 


  return (
    <div onClick={handleChange} className="cursor-pointer">
      {favorite ? (
        <Heart size={26} fill="#e22b2b" stroke="#e22b2b" />
      ) : (
        <Heart stroke="white" size={26} />
      )}
    </div>
  );
};

export default Favorite;
