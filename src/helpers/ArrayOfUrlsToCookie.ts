import Cookies from 'js-cookie';

export const ArrayOfUrlsToCookie = (urls: Array<string>):void => {
  const urlsInString = JSON.stringify(urls);
  const expireDate =  new Date;

  expireDate.setMinutes(expireDate.getMinutes() + 5);
  Cookies.set('dogsImages', urlsInString, { expires: expireDate });
};
