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
declare (strict_types=1);

namespace app\dao\user;

use app\dao\BaseDao;
use app\model\user\UserBill;

/**
 * 用户资金&积分&经验
 * Class UserBilldao
 * @package app\dao\user
 */
class UserBillDao extends BaseDao
{

    /**
     * 设置模型
     * @return string
     */
    protected function setModel(): string
    {
        return UserBill::class;
    }

    /**
     * 获取列表
     * @param array $where
     * @param string $field
     * @param int $page
     * @param int $limit
     * @param array $typeWhere
     * @param string $order
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getList(array $where, string $field = '*', int $page = 0, int $limit = 0, array $typeWhere = [], $order = 'id desc')
    {
        return $this->search($where)->when(count($typeWhere) > 0, function ($query) use ($typeWhere) {
            $query->where($typeWhere);
        })->field($field)->when($page && $limit, function ($query) use ($page, $limit) {
            $query->page($page, $limit);
        })->order($order)->select()->toArray();
    }

    /**
     * 获取列表
     * @param array $where
     * @param string $field
     * @param int $page
     * @param int $limit
     * @return array
     */
    public function getBillList(array $where, string $field = '*', int $page, int $limit)
    {
        return $this->search($where)->field($field)->with([
            'user' => function ($query) {
                $query->field('uid,nickname');
            }])->when($page && $limit, function ($query) use ($page, $limit) {
            $query->page($page, $limit);
        })->order('id desc')->select()->toArray();
    }

    /**
     * 获取某个条件总数
     * @param array $where
     */
    public function getBillSum(array $where)
    {
        return $this->search($where)->sum('number');
    }

    /**
     * 获取退款金额按照时间分组
     * @param array $time
     * @param string $timeType
     * @param string $field
     * @param string $str
     * @return mixed
     */
    public function getUserRefundPriceList(array $time, string $timeType, string $str, string $field = 'add_time')
    {
        return $this->getModel()->where('type', 'pay_product_refund')->where(function ($query) use ($time, $field) {
            if ($time[0] == $time[1]) {
                $query->whereDay($field, $time[0]);
            } else {
                $time[1] = date('Y/m/d', strtotime($time[1]) + 86400);
                $query->whereTime($field, 'between', $time);
            }
        })->field("FROM_UNIXTIME($field,'$timeType') as days,$str as num,GROUP_CONCAT(link_id) as link_ids")->group('days')->select()->toArray();
    }

    /**
     * 获取某个条件总条数
     * @param array $where
     */
    public function getBillCount(array $where)
    {
        return $this->getModel()->where($where)->count();
    }

    /**
     * 获取某些条件的bill总数
     * @param array $where
     * @return mixed
     */
    public function getBillSumColumn(array $where)
    {
        if (isset($where['uid']) && is_array($where['uid'])) {
            return $this->search($where)->group('uid')->column('sum(number) as num', 'uid');
        } else
            return $this->search($where)->sum('number');
    }

    /**
     *
     * @param array $where
     * @param string $filed
     * @return mixed
     */
    public function getType(array $where, string $filed = 'title,type')
    {
        return $this->search($where)->distinct(true)->field($filed)->group('type')->select();
    }

    /**
     * 获取签到用户数量
     * @param array $where
     * @return mixed
     */
    public function getUserSignPoint(array $where)
    {
        return $this->search($where)->count();
    }

    /**
     * 修改收货状态
     * @param int $uid
     * @param int $id
     * @return \crmeb\basic\BaseModel
     */
    public function takeUpdate(int $uid, int $id)
    {
        return $this->getModel()->where('uid', $uid)->where('link_id', $id)->where('type', 'pay_money')->update(['take' => 1]);
    }

    /**
     * @param array $where
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getUserBillList(array $where)
    {
        return $this->search($where)->select()->toArray();
    }

    /**
     * 获取佣金排行
     * @param array $where
     * @param int $page
     * @param int $limit
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function brokerageRankList(array $where, int $page, int $limit)
    {
        return $this->search($where)->field('uid,SUM(IF(pm=1,`number`,-`number`)) as brokerage_price')->with(['user' => function ($query) {
            $query->field('uid,avatar,nickname');
        }])->order('brokerage_price desc')->group('uid')->page($page, $limit)->select()->toArray();
    }

    /**
     * 时间分组
     * @param array $where
     * @param string $filed
     * @param string $group
     * @param int $page
     * @param int $limit
     * @return mixed
     */
    public function getUserBillListByGroup(array $where, string $filed, string $group, int $page, int $limit)
    {
        return $this->search($where)->field($filed)->where('number', '>', 0)->order('add_time desc')->group($group)->page($page, $limit)->select()->toArray();
    }

    /**
     * @param array $where
     * @param int $page
     * @param int $limit
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getBalanceRecord(array $where, int $page, int $limit)
    {
        return $this->search($where)->order('add_time desc')->page($page, $limit)->select()->toArray();
    }

    /**
     * 计算某个条件下订单内商品总数
     * @param $where
     * @return float|int
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getTotalSum(array $where)
    {
        $list = $this->search($where)->with('order')->select()->toArray();
        if (count($list)) {
            $sum = 0;
            foreach ($list as $item) {
                $sum += $item['total_num'];
            }
            return $sum;
        } else {
            return 0;
        }
    }

    /**
     * 获取某个字段总和
     * @param array $where
     * @param string $field
     * @return float
     */
    public function getWhereSumField(array $where, string $field)
    {
        return $this->search($where)
            ->when(isset($where['timeKey']), function ($query) use ($where) {
                $query->whereBetweenTime('add_time', $where['timeKey']['start_time'], $where['timeKey']['end_time']);
            })
            ->sum($field);
    }

    /**根据某字段分组查询
     * @param array $where
     * @param string $field
     * @param string $group
     * @return mixed
     */
    public function getGroupField(array $where, string $field, string $group)
    {
        return $this->search($where)
            ->when(isset($where['timeKey']), function ($query) use ($where, $field, $group) {
                $query->whereBetweenTime('add_time', $where['timeKey']['start_time'], $where['timeKey']['end_time']);
                $timeUinx = "%H";
                if ($where['timeKey']['days'] == 1) {
                    $timeUinx = "%H";
                } elseif ($where['timeKey']['days'] == 30) {
                    $timeUinx = "%Y-%m-%d";
                } elseif ($where['timeKey']['days'] == 365) {
                    $timeUinx = "%Y-%m";
                } elseif ($where['timeKey']['days'] > 1 && $where['timeKey']['days'] < 30) {
                    $timeUinx = "%Y-%m-%d";
                } elseif ($where['timeKey']['days'] > 30 && $where['timeKey']['days'] < 365) {
                    $timeUinx = "%Y-%m";
                }
                $query->field("sum($field) as number,FROM_UNIXTIME($group, '$timeUinx') as time");
                $query->group("FROM_UNIXTIME($group, '$timeUinx')");
            })
            ->order('add_time ASC')->select()->toArray();
    }

    /**
     * 获取退款佣金
     * @return mixed
     */
    public function getRefundBrokerage()
    {
        return $this->getModel()->whereIn('type', ['brokerage', 'brokerage_user'])
            ->where('category', 'now_money')
            ->where('pm', 0)
            ->group('uid')
            ->column('sum(number) as sum_number', 'uid');
    }

    /**
     * 积分趋势
     * @param $time
     * @param $timeType
     * @param $field
     * @param $str
     * @return mixed
     */
    public function getPointTrend($time, $timeType, $field, $str, $orderStatus = '')
    {
        return $this->getModel()->where(function ($query) use ($field, $orderStatus) {
            $query->where('category', 'integral');
            if ($orderStatus == 'add') {
                $query->where('pm', 1);
            } elseif ($orderStatus == 'sub') {
                $query->where('pm', 0);
            }
        })->where(function ($query) use ($time, $field) {
            if ($time[0] == $time[1]) {
                $query->whereDay($field, $time[0]);
            } else {
                $query->whereTime($field, 'between', $time);
            }
        })->field("FROM_UNIXTIME($field,'$timeType') as days,$str as num")->group('days')->select()->toArray();
    }
}
