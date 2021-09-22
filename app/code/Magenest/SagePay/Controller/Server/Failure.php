<?php
/**
 * Created by Magenest JSC.
 * Author: Jacob
 * Date: 18/01/2019
 * Time: 9:41
 */

namespace Magenest\SagePay\Controller\Server;

use Magenest\SagepayLib\Classes\SagepayApiException;
use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Magenest\SagepayLib\Classes\Constants;

class Failure extends Action
{
    protected $checkoutSession;

    protected $sageHelper;

    protected $cache;

    public function __construct(
        Context $context,
        \Magento\Checkout\Model\Session $checkoutSession,
        \Magenest\SagePay\Helper\SageHelper $sageHelper,
        \Magento\Framework\App\CacheInterface $cache
    ) {
        parent::__construct($context);
        $this->checkoutSession = $checkoutSession;
        $this->sageHelper = $sageHelper;
        $this->cache = $cache;
    }

    public function execute()
    {
        $data = $this->checkoutSession->getData('magenest_sagepay_server');
        if (!$data) {
            return $this->_redirect("*/*/redirectfailure");
        }
        try {
            //try 3 times to catch sage response
            $sageServerResponse = false;
            $runTime = 0;
            while(!$sageServerResponse)
            {
                $sageServerResponse = $this->cache->load($data['VendorTxCode'] ?? '');
                if(!$sageServerResponse){
                    sleep(1);
                }
                $runTime++;
                if($runTime>2){
                    $sageServerResponse = true;
                }
            }

            $sageServerResponse = json_decode($sageServerResponse, true);
            if(isset($sageServerResponse['StatusDetail']) && !empty($sageServerResponse['StatusDetail'])){
                $this->messageManager->addErrorMessage($sageServerResponse['StatusDetail']);
            }
            throw new SagepayApiException("Payment cancelled");
        }
        catch (SagepayApiException $e){
            $this->messageManager->addErrorMessage($e->getMessage());
            return $this->_redirect("checkout/cart");
        }
        catch (\Exception $e){
            $this->messageManager->addErrorMessage(__("Payment exception"));
            return $this->_redirect("checkout/cart");
        }

    }
}
