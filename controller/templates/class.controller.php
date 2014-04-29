<?php if (!defined('APPLICATION')) exit;

/**
 * <%= name %> Controller<% if (addon) { %>
 *
 * @author    <%= addon.author.name %><% if (addon.author.email) { %> <<%= addon.author.email %>><% } %>
 * @copyright <%= year %> (c) <%= addon.author.name %>
 * @license   <%= addon.license %>
 * @package   <%= _(addon.name).camelize() %>
 * @since     <%= addon.version %><% } %>
 */
class <%= _(name).classify() %>Controller extends Gdn_Controller
{
}
