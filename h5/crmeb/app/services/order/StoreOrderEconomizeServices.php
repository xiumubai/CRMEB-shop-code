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

namespace app\services\order;


use app\dao\order\StoreOrderEconomizeDao;
use app\services\BaseServices;
use crmeb\exceptions\ApiException;

/**
 * Class StoreOrderInvoiceServices
 * @package app\services\order
 */
class StoreOrderEconomizeServices extends BaseServices
{
    /**
     * LiveAnchorServices constructor.
     * @param StoreOrderInvoiceDao $dao
     */
    public function __construct(StoreOrderEconomizeDao $dao)
    {
        $this->dao = $dao;
    }

    /**添加节省金额数据
     * @param array $add
     * @return mixed
     */
    public function addEconomize(array $add)
    {
        if (!$add) throw new ApiException(100026);
        return $this->dao->save($add);
    }

    /**
     * @param array $where
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getOne(array $where)
    {
        if (!$where) throw new ApiException(100100);
        return $this->dao->getOne($where);
    }

    /**汇总付费会员节省金额
     * @param $uid
     * @return bool|float
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function sumEconomizeMoney($uid)
    {
        if (!$uid) return false;
        $list = $this->dao->getList(['uid' => $uid]);
        $economizeMoney = 0.00;
        if ($list) {
            foreach ($list as $k => $v) {
                $economizeMoney += $v['postage_price'];
                $economizeMoney += $v['member_price'];
                $economizeMoney += $v['offline_price'];
                $economizeMoney += $v['coupon_price'];
            }
        }
       return sprintf("%.2f",$economizeMoney);
    }
}
