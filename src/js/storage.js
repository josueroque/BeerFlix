/*eslint-disable no-undef*/
const lStorage={
  setItem:()=> localStorage.setItem(key,value),
  getItem: key=> localStorage.getItem(key),
};

const cookieStorage={
  setItem:(key,value) => cookieStorage.setItem(key,value),
  getItem: key=> Cookies.get(key) || '',

};
const storage=(type='lStorage')=>{
  const types={
    lStorage,
    cookieStorage,
  };
  if(typeof(Storage)!=='undefined'){
  // se acepta localStorage
  return types[type];
    }
    return types['cookieStorage'];
    
};

export default storage;




