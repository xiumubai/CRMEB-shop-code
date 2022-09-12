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
namespace crmeb\command;

use think\console\Command;
use think\console\Input;
use think\console\input\Argument;
use think\console\input\Option;
use think\console\Output;
use Workerman\Worker;

class Timer extends Command
{
    /**
     * @var int
     */
    protected $timer;

    /**
     * @var int|float
     */
    protected $interval = 2;

    protected function configure()
    {
        // 指令配置
        $this->setName('timer')
            ->addArgument('status', Argument::REQUIRED, 'start/stop/reload/status/connections')
            ->addOption('d', null, Option::VALUE_NONE, 'daemon（守护进程）方式启动')
            ->addOption('i', null, Option::VALUE_OPTIONAL, '多长时间执行一次,可以精确到0.001')
            ->setDescription('start/stop/restart 定时任务');
    }

    protected function init(Input $input, Output $output)
    {
        global $argv;

        if ($input->hasOption('i'))
            $this->interval = floatval($input->getOption('i'));

        $argv[1] = $input->getArgument('status') ?: 'start';
        if ($input->hasOption('d')) {
            $argv[2] = '-d';
        } else {
            unset($argv[2]);
        }
    }

    protected function execute(Input $input, Output $output)
    {
        $this->init($input, $output);
        Worker::$pidFile = app()->getRootPath().'runtime/timer.pid';
        $task = new Worker();
        $task->count = 1;
        event('Task_6');
        $task->onWorkerStart = [$this, 'start'];
        $task->runAll();
    }

    public function stop()
    {
        \Workerman\Lib\Timer::del($this->timer);
    }

    public function start()
    {
        $last = time();
        $task = [6 => $last, 10 => $last, 30 => $last, 60 => $last, 180 => $last, 300 => $last];
        $this->timer = \Workerman\Lib\Timer::add($this->interval, function () use (&$task) {
            try {
                $now = time();
                event('Task_2');
                foreach ($task as $sec => $time) {
                    if ($now - $time >= $sec) {
                        event('Task_' . $sec);
                        $task[$sec] = $now;
                    }
                }
            } catch (\Throwable $e) {
            }
        });
    }


}
