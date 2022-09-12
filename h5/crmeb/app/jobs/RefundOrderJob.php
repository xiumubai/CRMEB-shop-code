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

namespace app\jobs;

use app\services\order\OutStoreOrderRefundServices;
use crmeb\basic\BaseJobs;
use crmeb\traits\QueueTrait;
use think\facade\Log;

/**
 * 售后单消息队列
 * Class RefundOrderJob
 * @package app\jobs
 */
class RefundOrderJob extends BaseJobs
{
    use QueueTrait;

    /**
     * 售后单生成
     * @param int $oid
     * @param int $step
     * @return bool
     */
    public function refundCreate(int $oid, int $step = 0): bool
    {
        if ($step > 2) {
            Log::error('售后单' . $oid . '推送失败');
            return true;
        }

        try {
            /** @var OutStoreOrderRefundServices $services */
            $services = app()->make(OutStoreOrderRefundServices::class);
            if (!$services->refundCreatePush($oid)) {
                RefundOrderJob::dispatchSece(($step + 1) * 5, 'refundCreate', [$oid, $step + 1]);
            }
        } catch (\Exception $e) {
            Log::error('售后单' . $oid . '推送失败,失败原因:' . $e->getMessage());
            RefundOrderJob::dispatchSece(($step + 1) * 5, 'refundCreate', [$oid, $step + 1]);
        }
        return true;
    }

    /**
     * 取消申请
     * @param int $oid
     * @param int $step
     * @return bool
     */
    public function cancelApply(int $oid, int $step = 0): bool
    {
        if ($step > 2) {
            Log::error('取消售后单' . $oid . '推送失败');
            return true;
        }

        try {
            /** @var OutStoreOrderRefundServices $services */
            $services = app()->make(OutStoreOrderRefundServices::class);
            if (!$services->cancelApplyPush($oid)) {
                RefundOrderJob::dispatchSece(($step + 1) * 5, 'cancelApply', [$oid, $step + 1]);
            }
        } catch (\Exception $e) {
            Log::error('取消售后单' . $oid . '推送失败,失败原因:' . $e->getMessage());
            RefundOrderJob::dispatchSece(($step + 1) * 5, 'cancelApply', [$oid, $step + 1]);
        }
        return true;
    }
}