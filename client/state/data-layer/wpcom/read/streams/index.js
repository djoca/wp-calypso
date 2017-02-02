/**
 * External dependencies
 */
import { find, identity } from 'lodash';
import { translate } from 'i18n-calypso';
/**
 * Internal dependencies
 */
import { http } from 'state/data-layer/wpcom-http/actions';
import { dispatchRequest } from 'state/data-layer/wpcom-http/utils';
import warn from 'lib/warn';
import {
	requestInflight,
	markRequestInflight,
	completeRequest
} from 'lib/inflight';
import {
	READER_STREAMS_PAGE_REQUEST
} from 'state/action-types';
import { receivePage } from 'state/reader/streams/actions';
import { errorNotice } from 'state/notices/actions';

const streamToPathMatchers = [
	// [ regex, version, path, advice ]
	// ordering here is by how often we expect each stream type to be used
	// search is linear, so putting common things near the front can be helpful
	[ /^following$/, 'v1.2', '/read/following' ],
	[ /^search:/, 'v1.2', '/read/search' ],
	[ /^feed:/, 'v1.2', '/read/feed/:feed/posts' ],
	[ /^site:/, 'v1.2', '/read/sites/:site/posts' ],
	[ /^featured:/, 'v1.2', '/read/sites/:site/featured' ],
	[ /^a8c$/, 'v1.2', '/read/a8c' ],
	[ /^likes$/, 'v1.2', '/read/liked' ],
	[ /^recommendations_posts$/, 'v1.2', '/read/recommendations/posts' ],
	[ /^custom_recs:/, 'v1.2', '/read/recommendations/posts' ],
	[ /^tag:/, 'v1.2', '/read/tags/:tag/posts' ],
	[ /^list:/, 'v1.2', '/read/list/:owner/:slug/posts' ],
	[ /^featured:/, 'v1.2', '' ]
];

function apiForStream( streamId ) {
	return find( streamToPathMatchers, ( matcher ) => matcher[ 0 ].test( streamId ) );
}

export function keyForRequest( action ) {
	const { streamId, query } = action;
	const actionString = !! query
		? Object.keys( query )
			.sort() // sort the keys to make the string deterministic. key ordering is not.
			.reduce( ( memo, key ) => memo + `&${ key }=${ query[ key ] }`, '' )
		: '';
	return `${ action.type }-${ streamId }-${ actionString }`;
}

/**
 * Request a page for the given stream
 * @param  {function}   dispatch Redux Dispatcher
 * @param  {object}   action   Action being handled
 * @param  {Function} next     Continuation of handlers
 */
export function requestPage( { dispatch }, action, next ) {
	const { streamId, query } = action;
	const api = apiForStream( streamId );

	if ( ! api ) {
		warn( `Unable to determine api path for ${ streamId }` );
		next( action );
		return;
	}

	const requestKey = keyForRequest( action );
	if ( requestInflight( requestKey ) ) {
		next( action );
		return;
	}

	const [
		_, //eslint-disable-line no-unused-vars
		apiVersion,
		path,
		advice = identity
	] = api;

	markRequestInflight( requestKey );

	dispatch( http( {
		method: 'GET',
		path,
		apiVersion,
		query: advice( query, action ),
	} ) );

	next( action );
}

export function transformResponse( data ) {
	//TODO schema validation?
	return {
		posts: ( data && data.posts ) || []
	};
}

/**
 * Handle a page of posts
 * @param  {function}   dispatch store dispatcher
 * @param  {object}   action   action object that kicked off the request
 * @param  {Function} next     next part in the middleware chain
 * @param  {object}   data     response from API
 * @param  {array}   data.posts Array of posts
 */
export function handlePage( { dispatch }, action, next, data ) {
	completeRequest( keyForRequest( action ) );
	dispatch( receivePage( action.streamId, action.query, transformResponse( data ) ) );
}

export function handleError( { dispatch }, action ) {
	completeRequest( keyForRequest( action ) );
	dispatch( errorNotice( translate( 'Could not fetch the next page of results' ) ) );
}

export default {
	[ READER_STREAMS_PAGE_REQUEST ]: [ dispatchRequest( requestPage, handlePage, handleError ) ]
};