/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import { createReducer } from 'state/utils';
import {
	DESERIALIZE,
	SERIALIZE,

	TIMEZONES_RECEIVE,
	TIMEZONES_REQUEST,
	TIMEZONES_REQUEST_FAILURE,
	TIMEZONES_REQUEST_SUCCESS,
} from 'state/action-types';
import {
	rawOffsetsSchema,
	labelsSchema,
	continentsSchema
} from './schema';

export const rawOffsetReducer = createReducer( {}, {
	[ TIMEZONES_RECEIVE ]: ( state, { rawOffsets = [] } ) => rawOffsets
}, rawOffsetsSchema );

export const labelsReducer = createReducer( {}, {
	[ TIMEZONES_RECEIVE ]: ( state, { labels = {} } ) => labels
}, labelsSchema );

export const byContinentsReducer = createReducer( [], {
	[ TIMEZONES_RECEIVE ]: ( state, { byContinents } ) => ( byContinents )
}, continentsSchema );

export const requesting = ( state = false, action ) => {
	switch ( action.type ) {
		case TIMEZONES_REQUEST:
		case TIMEZONES_REQUEST_SUCCESS:
		case TIMEZONES_REQUEST_FAILURE:
			return action.type === TIMEZONES_REQUEST;

		case SERIALIZE:
		case DESERIALIZE:
			return false;
	}

	return state;
};

export default combineReducers( {
	rawOffsets: rawOffsetReducer,
	labels: labelsReducer,
	byContinents: byContinentsReducer,
	requesting,
} );
