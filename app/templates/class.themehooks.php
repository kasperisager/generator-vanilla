<?php if (!defined('APPLICATION')) exit;

/**
 * <%= name %> Theme Hooks
 *
 * @author    <%= author.name %><% if (author.email) { %> <<%= author.email %>><% } %>
 * @copyright <%= year %> (c) <%= author.name %>
 * @license   <%= license %>
 * @since     1.0.0
 */
class <%= _(name).classify() %>ThemeHooks implements Gdn_IPlugin {
    /**
     * This will run when you "Enable" the theme
     *
     * @since  1.0.0
     * @access public
     * @return bool
     */
    public function setup() {
        return true;
    }
}
