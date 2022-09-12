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

use app\services\yihaotong\SmsRecordServices;
use app\services\system\attachment\SystemAttachmentServices;
use crmeb\basic\BaseJobs;
use crmeb\traits\QueueTrait;

/**
 * 定时任务
 * Class TaskJob
 * @package crmeb\jobs
 */
class TaskJob extends BaseJobs
{
    use QueueTrait;

    /**
     * 修改短信发送记录短信状态
     */
    public function modifyResultCode()
    {
        /** @var SmsRecordServices $smsRecord */
        $smsRecord = app()->make(SmsRecordServices::class);
        return $smsRecord->modifyResultCode();
    }

    /**
     * 清除昨日海报
     * @return bool
     * @throws \Exception
     */
    public function emptyYesterdayAttachment()
    {
        /** @var SystemAttachmentServices $attach */
        $attach = app()->make(SystemAttachmentServices::class);
        return $attach->emptyYesterdayAttachment();
    }
}
