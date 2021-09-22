<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2021 Amasty (https://www.amasty.com)
 * @package Amasty_RecurringStripe
 */


declare(strict_types=1);

namespace Amasty\RecurringStripe\Model\IpnHandlers\Customer\Subscription;

use Amasty\RecurringStripe\Model\IpnHandlers\AbstractIpnHandler;

class Deleted extends AbstractIpnHandler
{
    /**
     * @inheritDoc
     */
    public function process(\Stripe\Event $event)
    {
        $subscription = $this->getSubscription($event);
        if (!$subscription) {
            return;
        }
        $storeId = (int)$subscription->getStoreId();

        if ($this->config->isNotifySubscriptionCanceled($storeId)) {
            $template = $this->config->getEmailTemplateSubscriptionCanceled($storeId);
            $this->emailNotifier->sendEmail(
                $subscription,
                $template
            );
        }
    }
}
