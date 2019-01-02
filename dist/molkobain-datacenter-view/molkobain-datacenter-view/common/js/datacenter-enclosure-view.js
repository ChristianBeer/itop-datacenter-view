/*
 * Copyright (c) 2015 - 2019 Molkobain.
 *
 * This file is part of licensed extension.
 *
 * Use of this extension is bound by the license you purchased. A license grants you a non-exclusive and non-transferable right to use and incorporate the item in your personal or commercial projects. There are several licenses available (see https://www.molkobain.com/usage-licenses/ for more informations)
 */

;
$(function()
{
	$.widget('molkobain.datacenter_enclosure_view', $.molkobain.datacenter_view,
		{
			options: {
				object_type: 'enclosure',
				defaults: {},
			},

			// Constructor
			_create: function()
			{
				this._super();

				this.element.addClass('molkobain-datacenter-enclosure-view');
			},
			// Events bound via _bind are removed automatically
			// Revert other modifications here
			_destroy: function()
			{
				this.element.removeClass('molkobain-datacenter-enclosure-view');

				this._super();
			},
			// _setOptions is called with a hash of all options that are changing
			// Always refresh when changing options
			_setOptions: function()
			{
				this._superApply(arguments);
			},
			// _setOption is called for each individual option that is changing
			_setOption: function(key, value)
			{
				this._super(key, value);
			},

			// Initialize the widget
			// Inherited methods
			// - Make the markup for views (eg. rack panels, enclosure panel, ...)
			_initializeViews: function()
			{
				var oEnclosureElem = this._initializeEnclosure(this.options.object_data);

				oEnclosureElem.appendTo(this.element.find('.mdv-views'));
			},
			// - Make the markup for elements (mounted or not) and display them where they belong
			_initializeElements: function()
			{
				this._initializeDevices();
			},
			// - Device. Overloaded to put in enclosure slot
			_initializeDevice: function(oDevice, oHostElem)
			{
				if((oHostElem === false) || (oHostElem === undefined) || (oHostElem === null))
				{
					oHostElem = this._getEnclosureSlotElement(oDevice.position_v, this._getObjectDatum('id'));
					if(oHostElem === false)
					{
						oHostElem = this.element.find('.mdv-unmounted-type[data-type="device"] .mhf-p-body')
					}
				}

				return this._super(oDevice, oHostElem);
			},
		}
	);
});
