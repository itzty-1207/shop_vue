<template>
  <div>
    <!--headup area-->
    <div class="headup-area">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" width="80%" class="location-icon" />
        </van-col>
        <van-col span="15">
          <img :src="headerBar" width="100%" class="headerBar"/>
        </van-col>
        <van-col span="3">
          <img :src="redpacketIcon" width="80%" class="redpacket-icon" />
        </van-col>
        <van-col span="3">
          <img :src="chatIcon" width="80%" class="chat-icon" />
        </van-col>
      </van-row>
    </div>
    <!--search bar-->
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="saomiaoIcon" width="80%" class="saomiao-icon"/>
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input"/>
        </van-col>
        <van-col span="5">
          <!-- <van-button class="search-btn">查找</van-button> -->
          <div class="btn-div"><button class="search-btn">搜索</button></div>
        </van-col>
      </van-row>
    </div>
    <!-- swiper area -->
    <div class="swiper-area">
        <van-swipe :autoplay="1000">
            <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                <img v-lazy="banner.image" width="100%"/>
            </van-swipe-item>
        </van-swipe>
    </div>
    <!--type bar-->
    <div class="type-bar">
      <div  v-for="(cate,index) in category" :key="index" >
              <img v-lazy="cate.image" width="90%" />
              <span>{{cate.mallCategoryName}}</span> 
      </div>
    </div>
    <!--AD-banner area-->
    <div class="ad-banner">
        <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
        <div class="recommend-title">
            商品推荐
        </div>
        <div class="recommend-body">
            <!--swiper-->
            <swiper :options="swiperOption">
                <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
                    <div class="recommend-item">
                            <img :src="item.image" width="80%" />
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
    <!--Hot Area-->
    <div class="hot-area">
        <div class="hot-title">热卖商品</div>
        <div class="hot-goods">
          <van-list>
            <van-row gutter="20">
                <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
                  <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                </van-col>
            </van-row>
          </van-list>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import floorComponent from '../component/floorComponent.vue'
import {toMoney} from '@/filter/moneyFilter.js'
import goodsInfo from '../component/goodsInfoComponent'
import url from '@/serviceAPI.config.js'

export default {
  data () {
    return {
      swiperOption:{slidesPerView:3},
      msg: 'Shopping Mall',
      locationIcon:require('../../assets/images/location.png'),
      saomiaoIcon:require('../../assets/images/saomiao.png'),
      chatIcon:require('../../assets/images/chat.png'),
      redpacketIcon:require('../../assets/images/redpacket.png'),
      headerBar:require('../../assets/images/head-bar.jpg'),
      bannerPicArray:[],
      category:[],
      adBanner:'',
      recommendGoods:[],
      floor1:[],
      floor2:[],
      floor3:[],
      floorName:{},
      hotGoods:[],    //热卖商品
    }
  },
  filters:{
    moneyFilter(money){
        return toMoney(money)
    }  
  },
  components:{swiper,swiperSlide,floorComponent,goodsInfo},
  created(){
    axios({
        url: url.getShoppingMallInfo,
        method: 'get',
    })
    .then(response => {
        console.log(response)
        if(response.status==200){
          this.category=response.data.data.category;
          this.adBanner = response.data.data.advertesPicture; //获得广告图片
          this.bannerPicArray = response.data.data.slides;   //轮播图片
          this.recommendGoods = response.data.data.recommend;  //推荐商品
          this.floor1 = response.data.data.floor1;             //楼层1数据
          this.floor2 = response.data.data.floor2; 
          this.floor3 = response.data.data.floor3; 
          this.floorName = response.data.data.floorName;
          this.hotGoods = response.data.data.hotGoods;           //热卖商品
        }
    })
    .catch((error) => {     
    })
  }
}
</script>

<style scoped>
   .headup-area{
     background-color:#F94583;
   }
   .search-bar{
      height: 2.2rem;
      background-color:#F94583;
      line-height:2.2rem;
      overflow: hidden;
   }
   .search-input{
      width:100%;
      height: 1.4rem;
      border-top:0px;
      border-left:0px;
      border-right:0px;
      border-bottom: 1px solid 1px !important ;
      border:1px solid #FF8000;
      border-top-left-radius: .75rem;
      border-bottom-left-radius: .75rem;
      background-color:#fff;
      color:#fff;
  }
  .btn-div{
    padding-top: .3rem;
    padding-left: .2rem;   
    line-height: 1.5rem;
  }
  .search-btn{
    border-top-right-radius: .75rem;
    border-bottom-right-radius: .75rem;
    border:1px solid #FF8000;
    border-left: 0px !important;
    border-bottom: 1px solid 1px !important ;
    height: 1.55rem;
    width: 3rem;
    line-height: 1.55rem;
    color: #000;
    text-align: center;
    font-size: 12px;
  }
  .saomiao-icon{
    height: 1.5rem;
    width: 1.5rem;
    padding-top: .3rem;
    padding-left: .3rem;
  }
  .redpacket-icon{
    height: 1.5rem;
    width: 1.5rem;
    padding-top: .3rem;
    padding-left: .3rem;
  }
  .location-icon{
    height: 1.5rem;
    width: 1.5rem;
    padding-top: .3rem;
    padding-left: .3rem;
  }
  .chat-icon{
    height: 1.3rem;
    width: 1.3rem;
    padding-top: .35rem;
    /* padding-left: .3rem; */
  }
  .headerBar{
    height: 1.5rem;
    padding-top: .3rem;
  }
  .swiper-area{
      clear:both;
      overflow: hidden;
      max-height: 20rem;
  }
  .type-bar{
      background-color: #fff;
      margin:0 .2rem .2rem .2rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
  }
  .type-bar div{
      padding: .2rem;
      font-size: 11px;
      text-align: center;
      flex: 1;
  }
  .recommend-area{
       background-color: #fff;
       margin-top: .3rem;
  }
  .recommend-title{
      text-align: center;
      border-bottom:1px solid #eee;
      font-size:14px;
      padding:.2rem;
      color:#FF8000;
  }
  .recommend-body{
       border-bottom: 1px solid #eee;
   }
  .recommend-item{
      width:99%;
      border-right: 1px solid #eee;
      font-size: 12px;
      text-align: center;
  }
  .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
  .hot-goods{
    height: 130rem;
    overflow: hidden;
    background-color: #fff;
  }
  .hot-title{
    text-align: center;
    border-bottom:1px solid #eee;
    font-size:14px;
    padding:.2rem;
    color:#FF8000;
  }
</style>