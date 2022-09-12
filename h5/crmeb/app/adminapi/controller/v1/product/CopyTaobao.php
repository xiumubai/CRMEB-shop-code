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
namespace app\adminapi\controller\v1\product;

use app\adminapi\controller\AuthController;
use app\services\product\product\CopyTaobaoServices;
use app\services\serve\ServeServices;
use think\facade\App;


/**
 * Class CopyTaobao
 * @package app\adminapi\controller\v1\product
 */
class CopyTaobao extends AuthController
{
    /**
     * CopyTaobao constructor.
     * @param App $app
     * @param CopyTaobaoServices $services
     */
    public function __construct(App $app, CopyTaobaoServices $services)
    {
        parent::__construct($app);
        $this->services = $services;
    }

    /**
     * 获取复制商品配置信息
     * @return mixed
     */
    public function getConfig()
    {
        $data = [];
        $copy = sys_config('system_product_copy_type', 1);
        $data['copy_type'] = $copy;
        $data['copy_num'] = 0;
        if ($copy == 1) {//一号通
            /** @var ServeServices $serverServices */
            $serverServices = app()->make(ServeServices::class);
            try {
                $info = $serverServices->user()->getUser();
            } catch (\Throwable $e) {
                $info = [];
            }
            if ($info) {
                $data['copy_num'] = $info['copy']['num'] ?? 0;
            }
        }
        return app('json')->success($data);
    }

    /**
     * 复制商品
     * @return mixed
     */
    public function copyProduct()
    {
        list($type, $id, $shopid, $url) = $this->request->postMore([
            ['type', ''],
            ['id', ''],
            ['shopid', ''],
            ['url', '']
        ], true);
        $res = $this->services->copyProduct($type, $id, $shopid, $url);
        return app('json')->success($res);
    }

    /**
     * 保存图片保存商品信息
     * @return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function save_product()
    {
        $data = $this->request->postMore([
            ['cate_id', ''],
            ['store_name', ''],
            ['store_info', ''],
            ['keyword', ''],
            ['unit_name', ''],
            ['image', ''],
            ['slider_image', []],
            ['price', 0],
            ['ot_price', 0],
            ['give_integral', ''],
            ['postage', ''],
            ['sales', 0],
            ['ficti', ''],
            ['stock', 0],
            ['cost', 0],
            ['description_images', []],
            ['description', ''],
            ['is_show', 0],
            ['soure_link', ''],
            ['temp_id', 0],
            ['spec_type', 0],
            ['items', []],
            ['attrs', []]
        ]);
        $this->services->save($data);
        return app('json')->success(100000);
    }
}
