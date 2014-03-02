<?php if (!defined('APPLICATION')) exit;

/**
 * <%= name %> Hooks
 *
 * @author    <%= author.name %><% if (author.email) { %> <<%= author.email %>><% } %>
 * @copyright <%= year %> (c) <%= author.name %>
 * @license   <%= license %>
 * @package   <%= _(name).camelize() %>
 * @since     1.0.0
 */
class <%= _(name).classify() %>Hooks implements Gdn_IPlugin
{
    /**
     * This will run when you "Enable" the application
     *
     * @since  1.0.0
     * @access public
     * @return bool
     */
    public function setup()
    {
        return true;
    }
}
