<?php
// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2022 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
namespace app\adminapi\controller\v1\system;


use think\facade\App;
use app\adminapi\controller\AuthController;
use app\services\system\SystemClearServices;
use app\services\product\product\StoreProductServices;
use app\services\system\attachment\SystemAttachmentServices;


/**
 * 清除默认数据理控制器
 * Class SystemClearData
 * @package app\admin\controller\system
 */
class SystemClearData extends AuthController
{
    /**
     * 构造方法
     * SystemClearData constructor.
     * @param App $app
     * @param SystemClearServices $services
     */
    public function __construct(App $app, SystemClearServices $services)
    {
        parent::__construct($app);
        $this->services = $services;
    }

    /**
     * 统一方法
     * @param $type
     * @return mixed
     */
    public function index($type)
    {
        switch ($type) {
            case 'temp':
                return $this->userTemp();
                break;
            case 'recycle':
                return $this->recycleProduct();
                break;
            case 'store':
                return $this->storeData();
                break;
            case 'category':
                return $this->categoryData();
                break;
            case 'order':
                return $this->orderData();
                break;
            case 'kefu':
                return $this->kefuData();
                break;
            case 'wechat':
                return $this->wechatData();
                break;
            case 'attachment':
                return $this->attachmentData();
                break;
            case 'article':
                return $this->articledata();
                break;
            case 'system':
                return $this->systemdata();
                break;
            case 'user':
                return $this->userRelevantData();
                break;
            case 'wechatuser':
                return $this->wechatuserData();
                break;
            default:
                return app('json')->fail(100100);
        }
    }

    /**
     * 清除用户生成的临时附件
     * @return mixed
     */
    public function userTemp()
    {
        /** @var SystemAttachmentServices $services */
        $services = app()->make(SystemAttachmentServices::class);
        $imageUrl = $services->getColumn(['module_type' => 2], 'att_dir');
        foreach ($imageUrl as $item) {
            @unlink(app()->getRootPath() . 'public' . $item);
        }
        $services->delete(2, 'module_type');
        $this->services->clearData(['qrcode'], true);
        return app('json')->success(100046);
    }

    /**
     * 清除回收站商品
     * @return mixed
     */
    public function recycleProduct()
    {
        /** @var StoreProductServices $services */
        $services = app()->make(StoreProductServices::class);
        $services->delete(1, 'is_del');
        return app('json')->success(100046);
    }

    /**
     * 清除用户数据
     * @return mixed
     */
    public function userRelevantData()
    {
        $this->services->clearData([
            'user_recharge', 'user_address', 'user_bill', 'user_enter', 'user_extract',
            'user_notice', 'user_notice_see', 'wechat_message', 'store_visit',
            'store_coupon_user', 'store_coupon_issue_user', 'store_bargain_user', 'store_bargain_user_help',
            'store_product_reply', 'store_product_cate', 'user_sign',
            'user_level', 'user_group', 'user_visit', 'user_label', 'user_label_relation', 'user_label_relation',
            'store_product_relation', 'sms_record', 'system_file', 'system_store', 'system_store_staff',
            'member_card', 'member_card_batch', 'member_ship', 'qrcode', 'user_brokerage_frozen', 'user_invoice'

        ], true);
        $this->services->delDirAndFile('./public/uploads/store/comment');
        return app('json')->success(100046);
    }

    /**
     * 清除商城数据
     * @return mixed
     */
    public function storeData()
    {
        $this->services->clearData([
            'store_coupon_issue', 'store_bargain', 'store_combination', 'store_product_attr',
            'store_product_attr_result', 'store_product_cate', 'store_product_attr_value', 'store_product_description',
            'store_product_rule', 'store_seckill', 'store_product', 'store_visit', 'store_product_log', 'category', 'delivery_service',
            'live_anchor', 'live_goods', 'live_room', 'live_room_goods', 'store_product_coupon'
        ], true);
        return app('json')->success(100046);
    }

    /**
     * 清除商品分类
     * @return mixed
     */
    public function categoryData()
    {
        $this->services->clearData(['store_category'], true);
        return app('json')->success(100046);
    }

    /**
     * 清除订单数据
     * @return mixed
     */
    public function orderData()
    {
        $this->services->clearData(['store_order', 'store_order_cart_info', 'store_order_status', 'store_pink',
            'store_cart', 'store_order_status', 'other_order', 'other_order_status', 'store_order_invoice'
        ], true);
        return app('json')->success(100046);
    }

    /**
     * 清除客服数据
     * @return mixed
     */
    public function kefuData()
    {
        $this->services->clearData([
            'store_service', 'store_service_log', 'store_service_record', 'store_service_feedback', 'store_service_speechcraft'
        ], true);
        $this->services->delDirAndFile('./public/uploads/store/service');
        return app('json')->success(100046);
    }

    /**
     * 清除微信管理数据
     * @return mixed
     */
    public function wechatData()
    {
        $this->services->clearData([
            'wechat_media', 'wechat_reply', 'cache', 'wechat_key',
            'wechat_news_category'
        ], true);
        $this->services->delDirAndFile('./public/uploads/wechat');
        return app('json')->success(100046);
    }

    /**
     * 清除所有附件
     * @return mixed
     */
    public function attachmentData()
    {
        $this->services->clearData([
            'system_attachment', 'system_attachment_category'
        ], true);
        $this->services->delDirAndFile('./public/uploads/');
        return app('json')->success(100046);
    }

    /**
     * 清除微信用户
     * @return mixed
     */
    public function wechatuserData()
    {
        $this->services->clearData([
            'user', 'wechat_user'
        ], true);
        return app('json')->success(100046);
    }

    //清除内容分类
    public function articledata()
    {
        $this->services->clearData([
            'article_category', 'article', 'article_content'
        ], true);
        return app('json')->success(100046);
    }

    //清除系统记录
    public function systemdata()
    {
        $this->services->clearData([
            'system_notice_admin', 'system_log'
        ], true);
        return app('json')->success(100046);
    }

    /**
     * 替换域名方法
     * @return mixed
     */
    public function replaceSiteUrl()
    {
        list($url) = $this->request->postMore([
            ['url', '']
        ], true);
        if (!$url)
            return app('json')->fail(400304);
        if (!verify_domain($url))
            return app('json')->fail(400305);
        $this->services->replaceSiteUrl($url);
        return app('json')->success(400306);
    }
}
