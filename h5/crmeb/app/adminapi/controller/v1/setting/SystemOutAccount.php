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
namespace app\adminapi\controller\v1\setting;

use app\adminapi\controller\AuthController;
use app\outapi\validate\StoreOutAccountValidate;
use app\services\out\LoginServices;
use think\facade\App;

/**
 * 对外接口账户
 * Class SystemOutAccount
 * @package app\adminapi\controller\v1\setting
 */
class SystemOutAccount extends AuthController
{
    /**
     * 构造方法
     * SystemOut constructor.
     * @param App $app
     * @param LoginServices $services
     */
    public function __construct(App $app, LoginServices $services)
    {
        parent::__construct($app);
        $this->services = $services;
    }

    /**
     * 账号信息
     * @return string
     * @throws \Exception
     */
    public function index()
    {
        $where = $this->request->getMore([
            ['name', '', ''],
            ['status', ''],
        ]);
        return app('json')->success($this->services->getList($where));
    }

    /**
     * 修改状态
     * @param string $status
     * @param string $id
     * @return mixed
     */
    public function set_status($id = '', $status = '')
    {
        if ($status == '' || $id == '') return $this->fail('缺少参数');
        $this->services->update($id, ['status' => $status]);
        return app('json')->success($status == 1 ? '开启成功' : '关闭成功');
    }

    /**
     * 删除
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        if ($id == '') return $this->fail('缺少参数');
        $this->services->update($id, ['is_del' => 1]);
        return app('json')->success('删除成功!');
    }

    /**
     * 保存
     * @return mixed
     */
    public function save()
    {
        $data = $this->request->postMore([
            [['appid', 's'], ''],
            [['appsecret', 's'], ''],
            [['title', 's'], ''],
        ]);
        $this->validate($data, StoreOutAccountValidate::class, 'save');
        if ($this->services->getOne(['appid' => $data['appid']])) return app('json')->fail('账号重复');
        if (!$data['appsecret']) {
            unset($data['appsecret']);
        } else {
            $data['appsecret'] = password_hash($data['appsecret'], PASSWORD_DEFAULT);
        }
        $data['add_time'] = time();
        if (!$this->services->save($data)) {
            return app('json')->fail('添加失败');
        } else {
            return app('json')->success('添加成功');
        }
    }

    /**
     * 修改
     * @param string $id
     * @return mixed
     */
    public function update($id = '')
    {
        $data = $this->request->postMore([
            [['appsecret', 's'], ''],
            [['title', 's'], ''],
        ]);

        $this->validate($data, StoreOutAccountValidate::class, 'update');
        if (!$data['appsecret']) {
            unset($data['appsecret']);
        } else {
            $data['appsecret'] = password_hash($data['appsecret'], PASSWORD_DEFAULT);
        }
        if (!$this->services->getOne(['id' => $id])) return app('json')->fail('没有此账号');

        $res = $this->services->update($id, $data);
        if (!$res) {
            return app('json')->fail('修改失败');
        } else {
            return app('json')->success('修改成功!');
        }
    }
}
