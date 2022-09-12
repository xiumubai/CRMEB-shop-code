<?php

namespace app\listener\order;

use app\jobs\RefundOrderJob;
use app\services\order\OutStoreOrderRefundServices;
use crmeb\interfaces\ListenerInterface;

/**
 * 售后单生成
 * Class orderRefundCreateAfter
 * @package app\listener\order
 */
class OrderRefundCreateAfter implements ListenerInterface
{
    public function handle($event): void
    {
        [$order] = $event;

        // 推送售后单
        if (sys_config('out_push_switch') && sys_config('out_push_order_url')) {
            /** @var OutStoreOrderRefundServices $refundServices */
            $refundServices = app()->make(OutStoreOrderRefundServices::class);
            $orderRefundId = $refundServices->value(['store_order_id' => (int)$order['id']], 'id');
            if ($orderRefundId) {
                RefundOrderJob::dispatchDo('refundCreate', [(int)$orderRefundId]);
            }
        }
    }
}
