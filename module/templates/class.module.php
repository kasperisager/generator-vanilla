<?php if (!defined('APPLICATION')) exit;

/**
 * <%= name %> Module<% if (addon) { %>
 *
 * @author    <%= addon.author.name %><% if (addon.author.email) { %> <<%= addon.author.email %>><% } %>
 * @copyright <%= year %> (c) <%= addon.author.name %>
 * @license   <%= addon.license %>
 * @package   <%= _(addon.name).camelize() %>
 * @since     <%= addon.version %><% } %>
 */
class <%= _(name).camelize() %>Module extends Gdn_Module
{
    /**
     * Returns the name of the asset where this component should be rendered.
     *<% if (addon) { %>
     * @since  <%= addon.version %><% } %>
     * @access public
     * @return string The asset in which the module appears by default
     */
    public function assetTarget()
    {
        return '<%= target %>';
    }

    /**
     * Returns the component as a string to be rendered to the screen.
     *<% if (addon) { %>
     * @since  <%= addon.version %><% } %>
     * @access public
     * @return string The HTML to render the module to the screen
     */
    public function toString()
    {
        if ($this->Visible) {
            return $this->fetchView();
        }
    }
}
