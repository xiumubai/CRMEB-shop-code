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

namespace app\services\message\notice;

use app\jobs\TemplateJob;
use app\services\message\NoticeService;
use app\services\kefu\service\StoreServiceServices;
use app\services\wechat\WechatUserServices;
use think\facade\Log;


/**
 * 微信模版消息列表
 * Created by PhpStorm.
 * User: xurongyao <763569752@qq.com>
 * Date: 2021/9/22 1:23 PM
 */
class WechatTemplateListService extends NoticeService
{

    /**
     * 判断是否开启权限
     * @var bool
     */
    private $isopend = true;

    /**
     * 是否开启权限
     * @param string $mark
     * @return $this
     */
    public function isOpen(string $mark)
    {
        $this->isopend = $this->notceinfo['is_wechat'] === 1;
        return $this;

    }

    /**
     * 根据UID获取openid
     * @param int $uid
     * @return mixed
     */
    public function getOpenidByUid(int $uid)
    {
        /** @var WechatUserServices $wechatServices */
        $wechatServices = app()->make(WechatUserServices::class);
        return $wechatServices->uidToOpenid($uid, 'wechat');
    }

    /**
     * 发送模板消息
     * @param int $uid
     * @param array $data
     * @param string|null $link
     * @param string|null $color
     * @return bool|void
     */
    public function sendTemplate(int $uid, array $data, string $link = null, string $color = null)
    {
        try {
            $this->isopend = $this->notceinfo['is_wechat'] === 1;
            if ($this->isopend) {
                $openid = $this->getOpenidByUid($uid);
                //放入队列执行
                TemplateJob::dispatchDo('doJob', ['wechat', $openid, $this->notceinfo['mark'], $data, $link, $color]);
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return true;
        }
    }

    /**
     * 支付成功发送模板消息
     * @param $uid
     * @param $order
     * @return bool|void
     */
    public function sendOrderPaySuccess($uid, $order)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您购买的商品已支付成功',
            'keyword1' => $order['order_id'],
            'keyword2' => $order['pay_price'],
            'remark' => '点击查看订单详情'
        ], '/pages/users/order_details/index?order_id=' . $order['order_id']);
    }

    /**
     * 购买会员成功
     * @param $uid
     * @param $order
     * @return bool|void
     */
    public function sendMemberOrderPaySuccess($uid, $order)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，购买会员成功，恭喜您成为本平台尊贵会员！',
            'keyword1' => $order['order_id'],
            'keyword2' => $order['pay_price'],
            'remark' => '点击查看订单详情'
        ], '/pages/annex/vip_paid/index');
    }

    /**
     * 订单发货
     * @param $uid
     * @param string $goodsName
     * @param $order
     * @param array $data
     * @return bool|void
     */
    public function sendOrderDeliver($uid, string $goodsName, $order, array $data)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲,您的订单已发货,请注意查收',
            'keyword1' => $goodsName,
            'keyword2' => $order['pay_type'] == 'offline' ? '线下支付' : date('Y/m/d H:i', $order['pay_time']),
            'keyword3' => $order['user_address'],
            'keyword4' => $order['delivery_name'],
            'keyword5' => $order['delivery_id'],
            'remark' => '点击查看订单详情'
        ], '/pages/users/order_details/index?order_id=' . $order['order_id']);
    }

    /**
     * 订单发货
     * @param $uid
     * @param $order
     * @param array $data
     * @return bool|void
     */
    public function sendOrderPostage($uid, $order, array $data)
    {
        return $this->sendTemplate((int)$uid, [
            'keyword1' => $order['order_id'],
            'keyword2' => $order['delivery_name'],
            'keyword3' => $order['delivery_id'],
            'first' => '亲,您的订单已发货,请注意查收',
            'remark' => '点击查看订单详情'
        ], '/pages/users/order_details/index?order_id=' . $order['order_id']);
    }

    /**
     * 发送客服消息
     * @param $uid
     * @param $data
     * @return bool|void
     */
    public function sendServiceNotice($uid, $data)
    {
        return $this->sendTemplate((int)$uid, [
            'keyword1' => '新订单',
            'keyword2' => $data['delivery_name'],
            'keyword3' => $data['delivery_id'],
            'first' => '亲,您有新的订单待处理',
            'remark' => '点击查看订单详情'
        ], '/pages/users/order_details/index?order_id=' . $data['order_id']);
    }

    /**
     * 退款发送客服消息
     * @param $uid
     * @param $data
     * @param string|null $link
     * @return bool|void
     */
    public function sendRefundServiceNotice($uid, $data, ?string $link = null)
    {
        return $this->sendTemplate((int)$uid, $data, $link);
    }

    /**
     * 确认收货发送模板消息
     * @param $uid
     * @param $order
     * @param $title
     * @return bool|void
     */
    public function sendOrderTakeSuccess($uid, $order, $title)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您的订单已收货',
            'keyword1' => $order['order_id'],
            'keyword2' => '已收货',
            'keyword3' => date('Y-m-d H:i:s', time()),
            'keyword4' => $title,
            'remark' => '感谢您的光临！'
        ]);
    }

    /**
     * 发送退款申请模板消息
     * @param $uid
     * @param $order
     * @return bool|void
     */
    public function sendOrderApplyRefund($uid, $order)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '你有一笔退款订单需要处理',
            'keyword1' => $order['order_id'],
            'keyword2' => $order['status'],
            'keyword3' => date('Y-m-d H:i:s', $order['add_time']),
            'remark' => '点击查看退款详情'
        ], '/pages/admin/orderDetail/index?id=' . $order['order_id']);
    }

    /**
     * 发送退款模板消息
     * @param $uid
     * @param $data
     * @param $order
     * @return bool|void
     */
    public function sendOrderRefundSuccess($uid, $data, $order)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您购买的商品已退款,本次退款' . $data['refund_price'] . '金额',
            'keyword1' => $data['order_id'],
            'keyword2' => $order['pay_price'],
            'keyword3' => date('Y-m-d H:i:s', $order['add_time']),
            'remark' => '点击查看订单详情'
        ], '/pages/users/order_details/index?order_id=' . $data['order_id'] . '&isReturen=1');
    }

    /**
     * 发送退款模板消息
     * @param $uid
     * @param $order
     * @return bool|void
     */
    public function sendOrderRefundNoStatus($uid, $order)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您的退款申请未申请通过',
            'keyword1' => $order['order_id'],
            'keyword2' => $order['pay_price'],
            'keyword3' => date('Y-m-d H:i:s', $order['add_time']),
            'remark' => '点击查看订单详情'
        ], '/pages/users/order_details/index?order_id=' . $order['order_id'] . '&isReturen=1');
    }

    /**
     * 发送用户充值退款模板消息
     * @param $uid
     * @param $data
     * @param $userRecharge
     * @return bool|void
     */
    public function sendRechargeRefundStatus($uid, $data, $userRecharge)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您充值的金额已退款,本次退款' .
                $data['refund_price'] . '金额',
            'keyword1' => $userRecharge['order_id'],
            'keyword2' => $userRecharge['price'],
            'keyword3' => date('Y-m-d H:i:s', $userRecharge['add_time']),
            'remark' => '点击查看订单详情'
        ], '/pages/users/user_bill/index');
    }

    /**
     * 拼团成功发送模板消息
     * @param $uid
     * @param $order_id
     * @param $pinkId
     * @param $title
     * @return bool|void
     */
    public function sendOrderPinkSuccess($uid, $order_id, $pinkId, $title)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您的拼团已经完成了',
            'keyword1' => $order_id,
            'keyword2' => $title,
            'remark' => '点击查看订单详情'
        ], '/pages/activity/goods_combination_status/index?id=' . $pinkId);
    }

    /**
     * 参团成功发送模板消息
     * @param $uid
     * @param string $order_id
     * @param string $title
     * @param int $pink_id
     * @return bool|void
     */
    public function sendOrderPinkUseSuccess($uid, string $order_id, string $title, int $pink_id)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您已成功参与拼团',
            'keyword1' => $order_id,
            'keyword2' => $title,
            'remark' => '点击查看订单详情'
        ], '/pages/activity/goods_combination_status/index?id=' . $pink_id);
    }

    /**
     * 取消拼团发送模板消息
     * @param $uid
     * @param $pink
     * @param $title
     * @return bool|void
     */
    public function sendOrderPinkClone($uid, $pink, $title)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您的拼团取消',
            'keyword1' => $title,
            'keyword2' => $pink->price,
            'keyword3' => $pink->price,
            'remark' => '点击查看订单详情'
        ], '/pages/activity/goods_combination_status/index?id=' . $pink->id);
    }

    /**
     * 拼团失败发送模板消息
     * @param $uid
     * @param $pink
     * @param $title
     * @return bool|void
     */
    public function sendOrderPinkFail($uid, $pink, $title)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您的拼团失败',
            'keyword1' => $title,
            'keyword2' => $pink->price,
            'keyword3' => $pink->price,
            'remark' => '点击查看订单详情'
        ], '/pages/activity/goods_combination_status/index?id=' . $pink->id);
    }

    /**
     * 开团成功发送模板消息
     * @param $uid
     * @param $pink
     * @param $title
     * @return bool|void
     */
    public function sendOrderPinkOpenSuccess($uid, $pink, $title)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '您好，您已成功开团！赶紧与小伙伴们分享吧！！！',
            'keyword1' => $title,
            'keyword2' => $pink['total_price'],
            'keyword3' => $pink['people'],
            'remark' => '点击查看订单详情'
        ], '/pages/activity/goods_combination_status/index?id=' . $pink['id']);
    }

    /**
     * 砍价成功发送模板消息
     * @param $uid
     * @param $bargain
     * @param array $bargainUser
     * @param int $bargainUserId
     * @return bool|void
     */
    public function sendBargainSuccess($uid, $bargain, $bargainUser = [], $bargainUserId = 0)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '好腻害！你的朋友们已经帮你砍到底价了！',
            'keyword1' => $bargain['title'],
            'keyword2' => $bargain['min_price'],
            'remark' => '点击查看订单详情'
        ], '/pages/activity/goods_bargain_details/index?id=' . $bargain['id'] . '&bargain=' . $bargainUserId);
    }

    /**
     * 佣金到账发送模板消息
     * @param string $uid
     * @param string $brokeragePrice
     * @param string $goodsName
     * @param string $goodsPrice
     * @param $orderTime
     * @return bool|void
     */
    public function sendOrderBrokerageSuccess(string $uid, string $brokeragePrice, string $goodsName, string $goodsPrice, $orderTime)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您有一笔佣金入账!',
            'keyword1' => $brokeragePrice,//分销佣金
            'keyword2' => $goodsPrice . "元",//交易金额
            'keyword3' => date('Y-m-d H:i:s', $orderTime),//结算时间
            'remark' => '点击查看订单详情'
        ], '/pages/users/user_spread_user/index');
    }

    /**
     * 绑定推广关系发送消息提醒
     * @param string $uid
     * @param string $userName
     * @return bool|void
     */
    public function sendBindSpreadUidSuccess(string $uid, string $userName)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '恭喜，加入您的团队',
            'keyword1' => $userName,
            'keyword2' => date('Y-m-d H:i:s', time()),
            'remark' => '授人以鱼不如授人以渔，一起分享赚钱吧，点击查看详情！'
        ], '/pages/users/user_spread_user/index');
    }

    /**
     * 新订单给客服提醒
     * @param $order
     * @return bool
     */
    public function sendAdminNewOrder($order)
    {
        /** @var StoreServiceServices $StoreServiceServices */
        $StoreServiceServices = app()->make(StoreServiceServices::class);
        $adminList = $StoreServiceServices->getStoreServiceOrderNotice();
        foreach ($adminList as $item) {
            $this->sendTemplate((int)$item['uid'],
                [
                    'keyword1' => '新订单',
                    'keyword2' => $order['delivery_name'],
                    'keyword3' => $order['delivery_id'],
                    'first' => '亲,您有新的订单待处理',
                    'remark' => '点击查看订单详情'
                ], '/pages/admin/orderDetail/index?id=' . $order['order_id']);
        }
        return true;
    }

    /**
     * 退款给客服提醒
     * @param $order
     * @return bool
     */
    public function sendAdminNewRefund($order)
    {

        /** @var StoreServiceServices $StoreServiceServices */
        $StoreServiceServices = app()->make(StoreServiceServices::class);
        $adminList = $StoreServiceServices->getStoreServiceOrderNotice();
        foreach ($adminList as $item) {
            $this->sendTemplate((int)$item['uid'],
                [
                    'keyword1' => '退款申请',
                    'keyword2' => $order['delivery_name'],
                    'keyword3' => $order['delivery_id'],
                    'first' => '亲,您有个退款订单待处理',
                    'remark' => '点击查看订单详情'
                ], '/pages/admin/orderDetail/index?id=' . $order['order_id']);
        }
        return true;
    }

    /**
     * 订单改价
     * @param $uid
     * @param $order
     * @return bool|void
     */
    public function sendPriceRevision($uid, $order)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您的订单已改价',
            'keyword1' => $order['order_id'],
            'keyword2' => $order['pay_price'],
            'remark' => '点击查看订单详情！'
        ], '/pages/users/order_details/index?order_id=' . $order['order_id']);
    }

    /**
     * 充值成功
     * @param $uid
     * @param $order
     * @return bool|void
     */
    public function sendRechargeSuccess($uid, $order)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您的充值已成功',
            'keyword1' => $uid,
            'keyword2' => $order['price'],
            'keyword3' => $order['order_id'],
            'keyword4' => date('Y-m-d H:i:s', $order['add_time']),
            'remark' => '感谢您的光临！'
        ]);
    }

    /**
     * 获得积分
     * @param $uid
     * @param $order
     * @return bool|void
     */
    public function sendUserIntegral($uid, $order)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您的积分已到账',
            'keyword1' => $uid,
            'keyword2' => $order['pay_price'],
            'keyword3' => $order['use_integral'],
            'keyword4' => $order['gain_integral'],
            'keyword5' => date('Y-m-d H:i:s', $order['add_time']),
            'remark' => '点击查看订单详情！'
        ], '/pages/users/order_details/index?order_id=' . $order['order_id']);
    }

    /**
     * 提醒付款通知
     * @param $uid
     * @param $order
     * @return bool|void
     */
    public function sendOrderPayFalse($uid, $order)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您有订单还未付款',
            'keyword1' => $order['order_id'],
            'keyword2' => $order['pay_price'],
            'keyword3' => date('Y-m-d H:i:s', $order['add_time']),
            'remark' => '感谢您的光临！'
        ]);
    }

    /**
     * 提现成功
     * @param $uid
     * @param $extractNumber
     * @return bool|void
     */
    public function sendUserExtract($uid, $extractNumber)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您的提现申请已通过',
            'keyword1' => $extractNumber,
            'keyword2' => date('Y-m-d H:i:s', time()),
            'keywords' => '已通过',
            'remark' => '感谢您的光临！'
        ]);
    }

    /**
     * 提现失败
     * @param $uid
     * @param $extractNumber
     * @param $message
     * @return bool|void
     */
    public function sendExtractFail($uid, $extractNumber, $message)
    {
        return $this->sendTemplate((int)$uid, [
            'first' => '亲，您的提现申请未通过',
            'keyword1' => $extractNumber,
            'keyword2' => date('Y-m-d H:i:s', time()),
            'keyword3' => $message,
            'remark' => '请联系管理员！'
        ]);
    }
}
