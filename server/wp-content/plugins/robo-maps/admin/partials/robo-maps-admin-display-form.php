<?php
/**
 * @product    RoboMap
 * @link       http://robosoft.co
 * @since      1.0.0
 *
 * @package    Robo_Maps
 * @subpackage Robo_Maps/admin

 * @author     RoboSoft Team <team@robosoft.co>
*/

$proHtml = '<span class="label label-danger robo-map-prolink">'.__('Pro').'</span>
';
?>
<div id="robo-map-modal" style="display:none;" >
<div  class="bootstrap-wrapper">
	<form role="form">
		<div role="tabpanel">
			<ul id="robo-map-tab-header" class="nav nav-tabs robo-strong" role="tablist">
				<li role="presentation" class="active">
					<a id="robomap-tab-label-general" aria-controls="tab1" href="#tab1" data-toggle="tab" role="tab" aria-expanded="true"><?php _e('General'); ?></a>
				</li>
				<li role="presentation">
					<a id="robomap-tab-label-view" aria-controls="tab2" href="#tab2" data-toggle="tab" role="tab"><?php _e('View'); ?></a>
				</li>
				<li role="presentation">
					<a id="robomap-tab-label-controls" aria-controls="tab3" href="#tab3" data-toggle="tab" role="tab"><?php _e('Controls'); ?></a>
				</li>
				<li role="presentation">
					<a id="robomap-tab-label-marker" aria-controls="robo-map-tab-marker" href="#robo-map-tab-marker" data-toggle="tab" role="tab"><?php _e('Markers');  echo ' '.$proHtml; ?></a>
				</li>
				
				<li role="presentation">
				    <a id="robomap-tab-label-saved" aria-controls="robo-map-tab-saved" href="#robo-map-tab-saved" data-toggle="tab" role="tab"><?php _e('Saved Maps'); echo ' '.$proHtml; ?> </a>
				</li>
  				<li role="presentation">
					<a id="robomap-tab-label-pro" aria-controls="robo-map-tab-pro" href="#robo-map-tab-pro" data-toggle="tab" role="tab"><?php _e('Get Pro Version'); ?></a>
				</li>
			</ul>
			<br />
			<div class="tab-content">
				<div id="tab1" class="tab-pane fade active in"  aria-labelledby="robomap-tab-label-general" role="tabpanel">
					<div class="form-group">
						<p> <strong><?php _e('Type position'); ?></strong>
						</p>
						<div class="btn-group" data-toggle="buttons">
							<label class="btn btn-default active">
								<input type="radio" name="robo-map-type-position" id="robo-map-type-position1" value="address" autocomplete="off" checked><?php _e('Address'); ?></label>
							<label class="btn btn-default">
								<input type="radio" name="robo-map-type-position" id="robo-map-type-position2" value="coord" autocomplete="off"><?php _e('Coordinates'); ?></label>
						</div>
					</div>
					<div id="robo-map-row-address" class="form-group">
						<div class="input-group">
							<div class="input-group-addon"><?php _e('Address'); ?></div>
							<input type="text" id="robo-map-address" name="robo-map-address" class="form-control"></div>
					</div>
					<div id="robo-map-row-coord" class="form-group hidden">
						<div class="row">
							<div class="col-md-6">
								<div class="input-group">
									<div class="input-group-addon"><?php _e('Latitude'); ?></div>
									<input type="text" id="robo-map-latitude" name="robo-map-latitude" class="form-control" placeholder="" />
								</div>
							</div>
							<div class="col-md-6">
								<div class="input-group">
									<div class="input-group-addon"><?php _e('Longitude'); ?></div>
									<input type="text" id="robo-map-longitude" name="robo-map-longitude" class="form-control" placeholder="" />
								</div>
							</div>
						</div>
					</div>
					<div id="robo-map-row-coord" class="form-group">
						<p> <strong><?php _e('Marker'); ?></strong>
						</p>
						<div class="btn-group" data-toggle="buttons">
							<label class="btn btn-default active">
								<input type="radio" name="robo-map-marker" id="robo-map-marker1" value="show" autocomplete="off" checked><?php _e('Show'); ?></label>
							<label class="btn btn-default">
								<input type="radio" name="robo-map-marker" id="robo-map-marker2" value="click" autocomplete="off"><?php _e('Show OnClick'); ?></label>
							<label class="btn btn-default">
								<input type="radio" name="robo-map-marker" id="robo-map-marker3" value="off" autocomplete="off"><?php _e('Off'); ?></label>
						</div>
					</div>
					<div id="robo-map-row-caption" class="form-group">
						<div class="input-group">
							<div class="input-group-addon"><?php _e('Marker Caption'); ?></div>
							<input type="text" id="robo-map-caption" name="robo-map-caption" class="form-control"></div>
					</div>
				</div>
				<div id="tab2"  class="tab-pane fade" aria-labelledby="robomap-tab-label-view" role="tabpanel">
					<div class="form-group">
						<p>
							<strong><?php _e('Size'); ?></strong>
						</p>
						<div class="row" style="max-width: 600px;">
							<div class="col-md-5">
								<div class="input-group">
									<div class="input-group-addon"><?php _e('Width'); ?></div>
									<input type="text" id="robo-map-width" name="robo-map-width" class="col-md-4 form-control" placeholder="" />
									<div class="input-group-addon">px <?php _e('or'); ?> %</div>
								</div>
							</div>
							<div class="col-md-5">
								<div class="input-group">
									<div class="input-group-addon"><?php _e('Height'); ?></div>
									<input type="text" id="robo-map-height" name="robo-map-height" class="form-control" placeholder="" />
									<div class="input-group-addon">px</div>
								</div>
							</div>

						</div>
					</div>
					<div id="robo-map-row-coord" class="form-group">
						<p>
							<strong><?php _e('Map View'); ?></strong>
						</p>
						<div class="btn-group" data-toggle="buttons">
							<label class="btn btn-default active">
								<input type="radio" name="robo-map-type-view" id="robo-map-type-view1" value="ROADMAP" autocomplete="off" checked>ROADMAP</label>
							<label class="btn btn-default">
								<input type="radio" name="robo-map-type-view" id="robo-map-type-view2" value="SATELLITE" autocomplete="off">SATELLITE</label>
							<label class="btn btn-default">
								<input type="radio" name="robo-map-type-view" id="robo-map-type-view3" value="HYBRID" autocomplete="off">HYBRID</label>
							<label class="btn btn-default">
								<input type="radio" name="robo-map-type-view" id="robo-map-type-view4" value="TERRAIN" autocomplete="off">TERRAIN</label>
							<label id="robo-map-type-map-osm" class="btn btn-default">
								<input type="radio" name="robo-map-type-view" id="robo-map-type-view5" value="OSM"  autocomplete="off">OSM <?php echo $proHtml; ?></label>
						</div>
					</div>

					<div class="form-group">
						<p>
							<strong><?php _e('Zoom'); ?></strong>
						</p>
						<div class="col-md-4">
							<div class="input-group">

								<input type="text" id="robo-map-zoom" name="robo-map-zoom" class="form-control input-mir" value="12" placeholder="" />
								<div class="input-group-addon">[0..18]</div>
							</div>
						</div>
						<!-- <div class="col-md-5"><input type="text" data-slider-id="robo-map-zoom-slider"  id="robo-map-zoom" value="12" data-slider-min="0" data-slider-max="18" data-slider-step="1" data-slider-value="12"  name="robo-map-zoom"  /></div>
						<div class="col-md-6"><span id="robo-map-zoom-label">Current Slider Value: <span id="robo-map-zoom-label-value">12</span></span></div>
						 -->
					</div>
					<div class="clearfix"></div>
				</div>

				<!-- Tabs 3 control -->

				<div id="tab3"  class="tab-pane fade" aria-labelledby="robomap-tab-label-controls" role="tabpanel">
					<div class="form-group">
						<div class="row">
							<div class="col-md-6"><strong><?php _e('Scroll Wheel Control'); ?></strong></div>
							<div class="col-md-6">
								<div class="input-group">
									<div class="btn-group" data-toggle="buttons">
										<label class="btn btn-default active">
											<input type="radio" name="robo-map-scroll" id="robo-map-scroll1" value="1" autocomplete="off" checked><?php _e('Enabled'); ?></label>
										<label class="btn btn-default">
											<input type="radio" name="robo-map-scroll" id="robo-map-scroll2" value="0" autocomplete="off"><?php _e('Disabled'); ?></label>

									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="form-group">
						<div class="row">
							<div class="col-md-6"><strong><?php _e('Street View'); ?></strong></div>
							<div class="col-md-6">
								<div class="input-group">

									<div class="btn-group" data-toggle="buttons">
										<label class="btn btn-default active">
											<input type="radio" name="robo-map-street" id="robo-map-street1" value="1" autocomplete="off" checked><?php _e('Enabled'); ?></label>
										<label class="btn btn-default">
											<input type="radio" name="robo-map-street" id="robo-map-street2" value="0" autocomplete="off"><?php _e('Disabled'); ?></label>

									</div>
								</div>

							</div>
						</div>
					</div>

					<div class="form-group">
						<div class="row">

							<div class="col-md-6"><strong><?php _e('Zoom Control'); ?></strong></div>
							<div class="col-md-6">
								<div class="input-group">

									<div class="btn-group" data-toggle="buttons">
										<label class="btn btn-default active">
											<input type="radio" name="robo-map-zoomcontrol" id="robo-map-zoomcontrol1" value="1" autocomplete="off" checked><?php _e('Enabled'); ?></label>
										<label class="btn btn-default">
											<input type="radio" name="robo-map-zoomcontrol" id="robo-map-zoomcontrol2" value="0" autocomplete="off"><?php _e('Disabled'); ?></label>

									</div>
								</div>

							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="row">

							<div class="col-md-6">
								<strong><?php _e('Pan Control'); ?></strong>
							</div>
							<div class="col-md-6">
								<div class="input-group">

									<div class="btn-group" data-toggle="buttons">
										<label class="btn btn-default active">
											<input type="radio" name="robo-map-pan" id="robo-map-pan1" value="1" autocomplete="off" checked><?php _e('Enabled'); ?></label>
										<label class="btn btn-default">
											<input type="radio" name="robo-map-pan" id="robo-map-pan2" value="0" autocomplete="off"><?php _e('Disabled'); ?></label>

									</div>
								</div>

							</div>
						</div>
					</div>

					<div class="form-group">
						<div class="row">

							<div class="col-md-6">
								<strong><?php _e('Overview Map'); ?></strong>
							</div>
							<div class="col-md-6">
								<div class="input-group">

									<div class="btn-group" data-toggle="buttons">
										<label class="btn btn-default active">
											<input type="radio" name="robo-map-overview" id="robo-map-overview1" value="1" autocomplete="off" checked><?php _e('Enabled'); ?></label>
										<label class="btn btn-default">
											<input type="radio" name="robo-map-overview" id="robo-map-overview2" value="0" autocomplete="off"><?php _e('Disabled'); ?></label>

									</div>
								</div>

							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="row">

							<div class="col-md-6">
								<strong><?php _e('Map Type'); ?></strong>
							</div>
							<div class="col-md-6">
								<div class="input-group">

									<div class="btn-group" data-toggle="buttons">
										<label class="btn btn-default active">
											<input type="radio" name="robo-map-mapcontrol" id="robo-map-mapcontrol1" value="1" autocomplete="off" checked><?php _e('Enabled'); ?></label>
										<label class="btn btn-default">
											<input type="radio" name="robo-map-mapcontrol" id="robo-map-omapcontrol2" value="0" autocomplete="off"><?php _e('Disabled'); ?></label>

									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
				<div id="robo-map-tab-marker"  class="tab-pane fade" aria-labelledby="robomap-tab-label-marker" role="tabpanel">

					<div class="pull-right">
						<button id="robo-map-add-marker" class="btn btn-default">
							<span class="glyphicon glyphicon-plus-sign tooltip-pro-version" aria-hidden="true"></span>
							<?php _e('Add Marker'); ?>
							<?php echo $proHtml; ?>
						</button>
					</div>
					<div class="clearfix"></div>
					<br />
					<table class="table table-striped">
						<thead>
							<tr>
								<th></th>
								<th><?php _e('Labels'); ?></th>
								<th><?php _e('Coordinates / Address'); ?></th>
								<th><?php _e('Link'); ?></th>
								<th><?php _e('Icon'); ?></th>

							</tr>
						</thead>
						<tbody>
						<tr>
							<td colspan="6" align="center"><span class="glyphicon glyphicon-info-sign"></span> <?php _e("You don't have any saved markers"); ?></td>
						</tr>
					</tbody>

				</table>
			</div>
			<div id="robo-map-tab-saved"  class="tab-pane fade" aria-labelledby="robomap-tab-label-saved" role="tabpanel">

					<div class="pull-right">
						<button id="robo-map-save-map" class="btn btn-default">
							<span class="glyphicon glyphicon-plus-sign tooltip-pro-version" aria-hidden="true"></span>
							<?php _e('Save current map'); ?>
							<?php echo $proHtml; ?></button>
					</div>
					<div class="clearfix"></div>
					<br>
					<table class="table table-striped">
						<thead>
							<tr>
								<th></th>
								<th><?php _e('ID'); ?></th>
								<th><?php _e('Title'); ?></th>
								<th><?php _e('Action'); ?></th>

							</tr>
						</thead>
						<tbody>
						<tr>
							<td colspan="4" align="center"><span class="glyphicon glyphicon-info-sign"></span><?php _e("You don't have any saved maps"); ?></td>

						</tr>
					</tbody>
					
				</table>
			</div>

			<div id="robo-map-tab-pro"  class="tab-pane fade" aria-labelledby="robomap-tab-label-pro" role="tabpanel">

				<h2><?php _e('What you get in professional version?'); ?></h2>
				<!-- <p>
				if you enjoy free version of RoboMaps, you can get even more features, <br> fast support  and more advantages of the professional version only for $10
				</p> -->
			
			<div class="pull-left  robo-map-icon">
				<span class="glyphicon glyphicon-map-marker robo-map-large"></span>
			</div>
			<div class="pull-left robo-map-icon-desc">
				<p class="robo-map-icon-desc-header"><?php _e('Markers'); ?></p>
				<p class="robo-map-icon-desc-text"><?php _e('multiply markers, advanced markers settings and styles'); ?></p>
			</div>
			<div class="clearfix"></div>

			<div class="pull-left  robo-map-icon">
				<span class="glyphicon glyphicon-edit robo-map-large"></span>
			</div>
			<div class="pull-left robo-map-icon-desc">
				<p class="robo-map-icon-desc-header"><?php _e('Preview'); ?></p>
				<p class="robo-map-icon-desc-text"><?php _e('life preview of the map in admin section'); ?></p>
			</div>
			<div class="clearfix"></div>

			<div class="pull-left  robo-map-icon">
				<span class="glyphicon glyphicon-floppy-saved robo-map-large"></span>
			</div>
			<div class="pull-left robo-map-icon-desc">
				<p class="robo-map-icon-desc-header"><?php _e('Save Settings'); ?></p>
				<p class="robo-map-icon-desc-text"><?php _e('save configured maps, modify your maps faster and easier'); ?></p>
			</div>
			<div class="clearfix"></div>

			<div class="pull-left  robo-map-icon">
				<span class="glyphicon glyphicon-tag robo-map-large"></span>
			</div>
			<div class="pull-left robo-map-icon-desc">
				<p class="robo-map-icon-desc-header"><?php _e('Short code'); ?></p>
				<p class="robo-map-icon-desc-text"><?php _e('dynamic, editable short codes for pre-configured maps'); ?></p>
			</div>
			<div class="clearfix"></div>


			<div class="pull-left  robo-map-icon">
				<span class="glyphicon glyphicon-question-sign robo-map-large"></span>
			</div>
			<div class="pull-left robo-map-icon-desc">
				<p class="robo-map-icon-desc-header"><?php _e('Extremely Fast Support'); ?></p>
				<p class="robo-map-icon-desc-text"><?php _e('even more fast support for professional package'); ?></p>
			</div>
			<div class="clearfix"></div>

			<div class="pull-left  robo-map-icon">
				<span class="glyphicon glyphicon-save robo-map-large"></span>
			</div>
			<div class="pull-left robo-map-icon-desc">
				<p class="robo-map-icon-desc-header"><?php _e('Free Updates'); ?></p>
				<p class="robo-map-icon-desc-text"><?php _e('pay one time, get free updates during next year'); ?></p>
			</div>
			<div class="clearfix"></div>

			<div class=" text-center">
				<a href="http://robosoft.co/products_info/?type=buy&amp;product=maps" id="robo-map-buy-button" class="btn btn-success btn-lg" ><?php _e('Buy RoboMaps Pro $10'); ?></a>
			</div>
		</div>
	</div>
</div>
</form>
<div id="robo-map-preview">
	<p id="robo-map-preview-header"><strong>Preview</strong> <?php echo $proHtml; ?></p>
	<div id="robo-map-preview-block" data-address="WC USA"></div>
</div>




<div id="robo-map-dialog-button">
	<button type="button" id="robo-map-insert-button" class="btn button-primary"><?php _e('Insert tag map'); ?></button>
	
</div>

<div class="clearfix"></div>
</div>
</div>