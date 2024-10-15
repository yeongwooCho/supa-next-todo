import {useEffect, useState} from "react";


export const useHydrate = () => {
  // React에서 client side render의 cycle로 오면 아래의 useEffect가 실행된다.
  // 이때 이 useEffect가 실행되는지만 판단하면 된다.
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return isMount;
}
