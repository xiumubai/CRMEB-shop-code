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
namespace app\api\controller\v1\user;

use app\Request;
use app\services\product\product\StoreProductRelationServices;


/**
 * 用户收藏
 * Class UserCollectController
 * @package app\api\controller\v1\user
 */
class UserCollectController
{
    protected $services = NUll;

    /**
     * UserCollectController constructor.
     * @param StoreProductRelationServices $services
     */
    public function __construct(StoreProductRelationServices $services)
    {
        $this->services = $services;
    }


    /**
     * 获取收藏商品
     * @param Request $request
     * @return mixed
     */
    public function collect_user(Request $request)
    {
        $uid = (int)$request->uid();
        return app('json')->success($this->services->getUserCollectProduct($uid));
    }

    /**
     * 添加收藏
     * @param Request $request
     * @return mixed
     */
    public function collect_add(Request $request)
    {
        [$id, $category] = $request->postMore([
            ['id', 0],
            ['category', 'product']
        ], true);
        if (!$id || !is_numeric($id)) return app('json')->fail(100100);
        $res = $this->services->productRelation((int)$id, $request->uid(), 'collect', $category);
        if (!$res) {
            return app('json')->fail(410130);
        } else {
            return app('json')->success(410129);
        }
    }

    /**
     * 取消收藏
     * @param Request $request
     * @return mixed
     * @throws \Exception
     */
    public function collect_del(Request $request)
    {
        [$id, $category] = $request->postMore([
            ['id', []],
            ['category', 'product']
        ], true);
        $uid = (int)$request->uid();
        $res = $this->services->unProductRelation($id, $uid, 'collect', $category);
        if (!$res) return app('json')->fail(100020);
        else return app('json')->success(100019);
    }

    /**
     * 批量收藏
     * @param Request $request
     * @return mixed
     */
    public function collect_all(Request $request)
    {
        $collectInfo = $request->postMore([
            ['id', ''],
            ['category', 'product'],
        ]);
        $collectInfo['id'] = explode(',', $collectInfo['id']);
        if (!count($collectInfo['id'])) {
            return app('json')->fail(100100);
        }
        $uid = (int)$request->uid();
        $productIdS = $collectInfo['id'];
        $res = $this->services->productRelationAll($productIdS, $uid, 'collect', $collectInfo['category']);
        if (!$res) {
            return app('json')->fail(410130);
        } else {
            return app('json')->success(410129);
        }
    }
}
