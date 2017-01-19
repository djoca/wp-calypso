/**
 * External dependencies
 */
import mapValues from 'lodash/mapValues';
import map from 'lodash/map';
import fromPairs from 'lodash/fromPairs';

/**
 * Internal dependencies
 */
import wpcom from 'lib/wp';

import { TIMEZONES_REQUEST } from 'state/action-types';

import {
	timezonesRequestSuccess,
	timezonesRequestFailure,
	timezonesReceive,
} from 'state/timezones/actions';

/**
 * Converts an array with the shape [ { value: 'foo', label: 'bar' } ]
 * to a keyed object { foo: 'bar' }.
 *
 * @param  {Array} data - data array to convert
 * @return {Object} a keyed object
 */
const valueLabelToObject = data => (
	fromPairs( map( data, ( { label, value } ) => ( [ value, label ] ) ) )
);

/**
 * Normalize data gotten from the REST API making them more Calypso friendly.
 *
 * @param {Object} data - REST-API response
 * @return {Object} normalized timezones data.
 */
export const fromApi = ( { manual_utc_offsets, timezones, timezones_by_continent } ) => ( {
	rawOffsets: valueLabelToObject( manual_utc_offsets ),
	labels: valueLabelToObject( timezones ),
	byContinents: mapValues( timezones_by_continent, zones => map( zones, ( { value } ) => ( value ) ) )
} );

/*
 * Start a request to WordPress.com server to get the timezones data
 */
export const requestTimezones = ( { dispatch } ) => (
	wpcom.req.get( '/timezones', { apiNamespace: 'wpcom/v2' } )
		.then( data => {
			dispatch( timezonesRequestSuccess() );
			dispatch( timezonesReceive( fromApi( data ) ) );
		} )
		.catch( error => {
			dispatch( timezonesRequestFailure( error ) );
		} )
);

export default {
	[ TIMEZONES_REQUEST ]: [ requestTimezones ],
};
