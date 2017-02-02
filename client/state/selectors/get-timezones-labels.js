/**
 * External dependencies
 */
import map from 'lodash/map';
import flatten from 'lodash/flatten';
import values from 'lodash/values';
import fromPairs from 'lodash/fromPairs';

/**
 * Internal dependencies
 */
import { getTimezonesByContinent } from 'state/selectors';

/**
 * Return an object of timezones.
 * Each element is has the shape `[ value ]: label`.
 * The `value` is the timezone-value used to data processing,
 * and the `label` is the value used for the UI.
 *
 * @param  {Object} state - Global state tree
 * @return {Object} An object of timezones labels
 */
export default function getTimezonesLabels( state ) {
	const byContienent = getTimezonesByContinent( state );
	return fromPairs( map( flatten( map( byContienent, values ) ), ( { value, label } ) => ( [ value, label ] ) ) );
}
