const BASEURL = "https://www.fastmock.site/mock/c54749c454abaf782af43e2577dc9a81/e_commerce/api/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo:BASEURL+'goods',    //商城首页所有信息
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser:LOCALURL+'user/register',   //用户注册接口
    login:LOCALURL+'user/login',   //用户登录接口
    getDetailGoodsInfo : LOCALURL+'goods/getDetailGoodsInfo',  //获取商品详情接口
    getCategoryList:LOCALURL+'goods/getCategoryList',    //得到大类信息
    getCategorySubList:LOCALURL+'goods/getCategorySubList',   //得到小类信息
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',   //得到小类商品信息

}

module.exports = URL