<?php

namespace app\listener\order;

use app\jobs\RefundOrderJob;
use crmeb\interfaces\ListenerInterface;

/**
 * 售后单取消
 * Class OrderRefundCancelAfter
 * @package app\listener\order
 */
class OrderRefundCancelAfter implements ListenerInterface
{
    public function handle($event): void
    {
        [$orderRefundInfo] = $event;

        // 售后单取消
        if (sys_config('out_push_switch') && sys_config('out_push_refund_cancel_url')) {
            RefundOrderJob::dispatchDo('cancelApply', [(int)$orderRefundInfo['id']]);
        }
    }
}
