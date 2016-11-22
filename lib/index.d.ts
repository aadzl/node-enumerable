/**
 * Describes a function that aggregates items to one value.
 *
 * @param {any} result The current result value.
 * @param {T} item The current item.
 * @param {IItemContext<T>} ctx The item context.
 *
 * @return {U} The new aggregated value.
 */
export declare type Aggregator<T, U> = (result: any, item: T, ctx: IItemContext<T>) => U;
/**
 * Describes an action.
 *
 * @param {T} item The underlying item.
 * @param {IItemContext<T>} ctx The context.
 */
export declare type Action<T> = (item: T, ctx: IItemContext<T>) => void;
/**
 * Describes a function for sorting elements.
 *
 * @param {T} x The current / left item.
 * @param {any} y The other / right item.
 *
 * @return {number} The sort value.
 */
export declare type Comparer<T> = (x: T, y: any) => number;
/**
 * Describes a predicate that checks for the equality of two items.
 *
 * @param {T} x The current / left item.
 * @param {any} y The other / right item.
 *
 * @return {boolean} Are equal or not.
 */
export declare type EqualityComparer<T> = (x: T, y: any) => boolean;
/**
 * Describes a key selector.
 *
 * @param {K} k The original key.
 * @param {T} item The current item.
 * @param {IItemContext<T>} ctx The item context.
 *
 * @return {U} The "new" key.
 */
export declare type KeySelector<K, T, U> = (key: K, item: T, ctx: IItemContext<T>) => U;
/**
 * Describes a selector that projects items to a list of new items.
 *
 * @param {T} item The underlying item.
 * @param {IItemContext<T>} ctx The context.
 *
 * @return {Sequence<U>} The new items.
 */
export declare type ManySelector<T, U> = (item: T, ctx: IItemContext<T>) => Sequence<U>;
/**
 * Describes a predicate.
 *
 * @param {T} item The underlying item.
 * @param {IItemContext<T>} ctx The context.
 *
 * @return {boolean} Item does match conditions or not.
 */
export declare type Predciate<T> = (item: T, ctx: IItemContext<T>) => boolean;
/**
 * Describes a selector.
 *
 * @param {T} item The underlying item.
 * @param {IItemContext<T>} ctx The context.
 *
 * @return {U} The new item.
 */
export declare type Selector<T, U> = (item: T, ctx: IItemContext<T>) => U;
/**
 * A sequence.
 */
export declare type Sequence<T> = ArrayLike<T> | Iterator<T> | Iterable<T> | IterableIterator<T>;
/**
 * Describes a function that "zips" two elements.
 *
 * @param {T} item1 The first item.
 * @param {U} item2 The second item.
 * @param {IItemContext<T>} ctx1 The context of item1.
 * @param {IItemContext<U>} ctx2 The context of item2.
 *
 * @return {V} The zipped value.
 */
export declare type Zipper<T, U, V> = (item1: T, item2: U, ctx1: IItemContext<T>, ctx2: IItemContext<U>) => V;
/**
 * Describes a sequence.
 */
export interface IEnumerable<T> extends Iterable<T> {
    /**
     * Aggregates all itms of the sequence to one item.
     *
     * @param {Aggregator<T, TResult>) => TResult | string} The aggregator.
     * @param {TDefault} [defaultValue] The value to return if sequence is empty.
     *
     * @return {TResult | TDefault} The aggregated value or the default value.
     */
    aggregate<TResult, TDefault>(aggregator: Aggregator<T, TResult> | string, defaultValue?: TDefault): TResult | TDefault;
    /**
     * Checks if ALL items do match a condition.
     *
     * @param {Predciate<T> | string} predicate The predicate to use.
     *
     * @return {boolean} All do match or not.
     */
    all(predicate: Predciate<T> | string): boolean;
    /**
     * Checks if ANY items do match a condition.
     *
     * @param {Predciate<T> | string} [predicate] The predicate to use.
     *                                            If not defined, the method checks if that sequence contains at least one item.
     *
     * @return {boolean} At least one does match or not.
     */
    any(predicate?: Predciate<T> | string): boolean;
    /**
     * Computes the average of that sequence.
     *
     * @param {TDefault} [defaultValue] The custom value that is returned if sequence has no items.
     *
     * @return {number | TDefault} The average of the sequence or the default value.
     */
    average<TDefault>(defaultValue?: TDefault): number | TDefault;
    /**
     * Casts the items of that sequence to a new type.
     *
     * @return {IEnumerable<TTarget>} The new sequence.
     */
    cast<TTarget>(): IEnumerable<TTarget>;
    /**
     * Concats the items of that sequence with another.
     *
     * @param {Sequence<T>} other The other sequence.
     *
     * @return {IEnumerable<U>} The new sequence.
     */
    concat(other: Sequence<T>): IEnumerable<T>;
    /**
     * Joins the elements of that sequence to one string.
     *
     * @param {string} [defaultValue] The value to return if sequence is empty. Default: ''
     *
     * @return {string} The string.
     */
    concatToString(defaultValue?: string): string;
    /**
     * Checks if that sequence contains an item.
     *
     * @param {any} item The item to search for.
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     *
     * @return {boolean} Does contain item or not.
     */
    contains(item: any, comparer?: EqualityComparer<T> | string | true): boolean;
    /**
     * Counts the elements of that sequence.
     *
     * @param {Predciate<T> | string} [predicate] The custom predicate to use.
     *
     * @return {Number} The number of elements.
     */
    count(predicate?: Predciate<T> | string): number;
    /**
     * Returns the elements of the sequence or a sequence with default values if the current sequence is empty.
     *
     * @param {T} ...args One or more element for a "default sequence",
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    defaultIfEmpty(...args: T[]): IEnumerable<T>;
    /**
     * Removes duplicates.
     *
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    distinct(comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /**
     * Iterates over the tems.
     *
     * @param {Action<T>} The action to invoke.
     */
    each(action: Action<T>): void;
    /**
     * Returns an element at a specific position.
     *
     * @param {number} index The zero based index.
     *
     * @return {T} The item.
     *
     * @throws Sequence has no matching item.
     */
    elementAt(index: number): T;
    /**
     * Tries to return an element at a specific position.
     *
     * @param {number} index The zero based index.
     * @param {TDefault} [defaultValue] The value to return if no element has been found.
     *
     * @return {T | TDefault} The item or the default value.
     *
     * @throws Index is out of range.
     */
    elementAtOrDefault<TDefault>(index: number, defaultValue?: TDefault): T | TDefault;
    /**
     * Produces the difference between that sequence and another.
     *
     * @param {Sequence<T>} other The items to except.
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     *
     * {IEnumerable<T>} The new sequence.
     */
    except(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /**
     * Returns the first item of the sequence.
     *
     * @param {Predciate<T> | string} [predicate] The custom predicate to use.
     *
     * @return {T} The item.
     *
     * @throws Sequence has no matching item.
     */
    first(predicate?: Predciate<T> | string): T;
    /**
     * Tries to return the first item of the sequence.
     *
     * @param {Predciate<T> | string | TDefault} [predicateOrDefaultValue] The custom predicate to use.
     *                                                                     If there are less than 2 arguments and the first argument is NOT a function,
     *                                                                     it is used as default value.
     *
     * @return {T | TDefault} The item or the default value.
     */
    firstOrDefault<TDefault>(predicateOrDefaultValue?: Predciate<T> | string | TDefault, defaultValue?: TDefault): T | TDefault;
    /**
     * Alias for 'each()' method.
     */
    forEach(action: Action<T>): void;
    /**
     * Gets the enumerator for iteration.
     *
     * @return {IEnumerator<T>} The enumerator.
     */
    getEnumerator(): IEnumerator<T>;
    /**
     * Groups the elements of the sequence.
     *
     * @param {Selector<T, TKey> | string} keySelector The function that provides the key for an element.
     * @param {EqualityComparer<TKey> | string} [keyEqualityComparer] The optional equality comparer for the keys.
     *
     * @return {IEnumerable<IGrouping<T, TKey>>} The list of groupings.
     */
    groupBy<TKey>(keySelector: Selector<T, TKey> | string, keyEqualityComparer?: EqualityComparer<TKey> | string): IEnumerable<IGrouping<T, TKey>>;
    /**
     * Correlates the elements of that sequence and another based on matching keys and groups them.
     *
     * @param {Sequence<TInner>} inner The other sequence.
     * @param {Selector<T, TKey> | string} outerKeySelector The key selector for the items of that sequence.
     * @param {Selector<TInner, TKey> | string} innerKeySelector The key selector for the items of the other sequence.
     * @param {Zipper<T, IEnumerable<TInner>, TResult> | string} resultSelector 	The function that provides the result value for two matching elements.
     * @param {EqualityComparer<TKey> | string} [comparer] The custom key comparer.
     *
     * @return {IEnumerable<TResult>} The sequence with the joined items.
     */
    groupJoin<TInner, TKey, TResult>(inner: Sequence<TInner>, outerKeySelector: Selector<T, TKey> | string, innerKeySelector: Selector<TInner, TKey> | string, resultSelector: Zipper<T, IEnumerable<TInner>, TResult> | string, comparer?: EqualityComparer<TKey> | string): IEnumerable<TResult>;
    /**
     * Produces the set intersection of that sequence and another.
     *
     * @param {Sequence<T>} other The other sequence.
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     *
     * {IEnumerable<T>} The new sequence.
     */
    intersect(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /** @inheritdoc */
    [Symbol.iterator](): IEnumerator<T>;
    /**
     * Correlates the elements of that sequence and another based on matching keys.
     *
     * @param {Sequence<TInner>} inner The other sequence.
     * @param {Selector<T, TKey> | string} outerKeySelector The key selector for the items of that sequence.
     * @param {Selector<TInner, TKey> | string} innerKeySelector The key selector for the items of the other sequence.
     * @param {Zipper<T, TInner, TResult> | string} resultSelector 	The function that provides the result value for two matching elements.
     * @param {EqualityComparer<TKey> | string} [comparer] The custom key comparer.
     *
     * @return {IEnumerable<TResult>} The sequence with the joined items.
     */
    join<TInner, TKey, TResult>(inner: Sequence<TInner>, outerKeySelector: Selector<T, TKey> | string, innerKeySelector: Selector<TInner, TKey> | string, resultSelector: Zipper<T, TInner, TResult> | string, comparer?: EqualityComparer<TKey> | string): IEnumerable<TResult>;
    /**
     * Joins the elements of that sequence to one string.
     *
     * @param {string} separator The separator to use. Default: ''
     * @param {string} [defaultValue] The value to return if sequence is empty. Default: ''
     *
     * @return {string} The string.
     */
    joinToString(separator: string, defaultValue?: string): string;
    /**
     * Returns the last item of the sequence.
     *
     * @param {Predciate<T> | string} [predicate] The custom predicate to use.
     *
     * @return {T} The item.
     *
     * @throws Sequence has no matching item.
     */
    last(predicate?: Predciate<T> | string): T;
    /**
     * Tries to return the last item of the sequence.
     *
     * @param {Predciate<T> | string | TDefault} [predicateOrDefaultValue] The custom predicate to use.
     *                                                                     If there are less than 2 arguments and the first argument is NOT a function,
     *                                                                     it is used as default value.
     *
     * @return {T | TDefault} The item or the default value.
     */
    lastOrDefault<TDefault>(predicateOrDefaultValue?: Predciate<T> | string | TDefault, defaultValue?: TDefault): T | TDefault;
    /**
     * Returns the "biggest" item of that sequence.
     *
     * @param {TDefault} [defaultValue] The value to return if sequence is empty.
     *
     * @return {T | TDefault} The "biggest" value or the default value.
     */
    max<TDefault>(defaultValue?: TDefault): T | TDefault;
    /**
     * Returns the "smallest" item of that sequence.
     *
     * @param {TDefault} [defaultValue] The value to return if sequence is empty.
     *
     * @return {T | TDefault} The "smallest" value or the default value.
     */
    min<TDefault>(defaultValue?: TDefault): T | TDefault;
    /**
     * Removes all non-empty items.
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    notEmpty(): IEnumerable<T>;
    /**
     * Filters the items of a specific type.
     *
     * @param {string} type The name of the target type.
     *
     * @return {IEnumerable<TTarget>} The new sequence.
     */
    ofType<TTarget>(type: string): IEnumerable<TTarget>;
    /**
     * Sorts the elements of that sequence in ascending order by using the values itself as keys.
     *
     * @param {Comparer<T> | string} [comparer] The custom key comparer to use.
     *
     * @throws The comparer is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    order(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
    /**
     * Sorts the elements of that sequence in ascending order.
     *
     * @param {Selector<T, TKey> | string} selector The key selector.
     * @param {Comparer<TKey> | string} [comparer] The custom key comparer to use.
     *
     * @throws At least one argument is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    orderBy<TKey>(selector: Selector<T, TKey> | string, comparer?: Comparer<TKey> | string): IOrderedEnumerable<T>;
    /**
     * Sorts the elements of that sequence in descending order.
     *
     * @param {Selector<T, TKey> | string} selector The key selector.
     * @param {Comparer<TKey> | string} [comparer] The custom key comparer to use.
     *
     * @throws At least one argument is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    orderByDescending<TKey>(selector: Selector<T, TKey> | string, comparer?: Comparer<TKey> | string): IOrderedEnumerable<T>;
    /**
     * Sorts the elements of that sequence in descending order by using the values as keys.
     *
     * @param {Comparer<T> | string} [comparer] The custom key comparer to use.
     *
     * @throws The comparer is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    orderDescending(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
    /**
     * Adds all elements of that sequence to an array.
     *
     * @param {ArrayLike<T>} arr The target array.
     *
     * @chainable.
     */
    pushToArray(arr: T[]): IEnumerable<T>;
    /**
     * Reverses the order of the sequence.
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    reverse(): IOrderedEnumerable<T>;
    /**
     * Projects the items of that sequence to new items.
     *
     * @param {Selector<T, TTarget> | string} The selector to use.
     *
     * @return {IEnumerable<TTarget>} The new sequence.
     */
    select<TTarget>(selector: Selector<T, TTarget> | string): IEnumerable<TTarget>;
    /**
     * Projects each item to a list of new items and flattens them to a new sequence.
     *
     * @param {ManySelector<T, TTarget> | string} The selector to use.
     *
     * @return {IEnumerable<TTarget>} The new sequence.
     */
    selectMany<TTarget>(selector: ManySelector<T, TTarget> | string): IEnumerable<TTarget>;
    /**
     * Checks if that sequence has the same items as onther sequence.
     *
     * @param {Sequence<T>} other The other sequence.
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     * @param {EqualityComparer<any> | string | true} [keyComparer] The custom key comparer to use.
     *                                                              If (true), the methods also checks for matching data type (=== operator).
     *
     * @return {boolean} Both sequences are the same or not.
     */
    sequenceEqual(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true, keyComparer?: EqualityComparer<any> | string | true): boolean;
    /**
     * Returns the one and only item of the sequence.
     *
     * @param {Predciate<T> | string} [predicate] The custom predicate to use.
     *
     * @return {T} The item.
     *
     * @throws No item found or sequence contains more than one machting element.
     */
    single(predicate?: Predciate<T> | string): T;
    /**
     * Tries to return the one and only item of the sequence.
     *
     * @param {Predciate<T> | string | TDefault} [predicateOrDefaultValue] The custom predicate to use.
     *                                                                     If there are less than 2 arguments and the first argument is NOT a function,
     *                                                                     it is used as default value.
     *
     * @return {T | TDefault} The item or the default value.
     *
     * @throws Sequence contains more than one machting element.
     */
    singleOrDefault<TDefault>(predicateOrDefaultValue?: Predciate<T> | string | TDefault, defaultValue?: TDefault): T | TDefault;
    /**
     * Skips a number of items.
     *
     * @param {number} cnt The number of items to skip.
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    skip(cnt: number): IEnumerable<T>;
    /**
     * Takes all items BUT the last one.
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    skipLast(): IEnumerable<T>;
    /**
     * Skips items while a condition matches.
     *
     * @param {Predciate<T> | string} predicate The predicate to use.
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    skipWhile(predicate: Predciate<T> | string): IEnumerable<T>;
    /**
     * Calculates the sum of all items.
     *
     * @param {TTarget} [defaultValue] The custom value that is returned if sequence has no items.
     *
     * @return {number | TTarget} The sum or the default value.
     */
    sum<TTarget>(defaultValue?: TTarget): number | TTarget;
    /**
     * Takes a number of items.
     *
     * @param {number} cnt The number of items to take.
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    take(cnt: number): IEnumerable<T>;
    /**
     * Takes items while a condition matches.
     *
     * @param {Predciate<T> | string} predicate The predicate to use.
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    takeWhile(predicate: Predciate<T> | string): IEnumerable<T>;
    /**
     * Converts the items of that sequence to a new array.
     *
     * @param {KeySelector<any, T, number> | string} [keySelector] The custom index / key selector.
     *                                                             If (true), the value from 'key' property is used as index.
     *
     * @return {ArrayLike<T>} The new array.
     */
    toArray(keySelector?: KeySelector<any, T, number> | string | true): T[];
    /**
     * Creates a new list from that sequence.
     *
     * @param {boolean} [isReadOnly] The new should be readonly or not. Default: (false).
     * @param {EqualityComparer<T> | string} [comparer] The comparer for the items.
     *
     * @return {IList<T>} The new list.
     */
    toList(isReadOnly?: boolean, comparer?: EqualityComparer<T> | string): IList<T>;
    /**
     * Converts the items of that sequence to a new "lookup" object.
     *
     * @param {KeySelector<any, T, number> | string} [keySelector] The custom index / key selector.
     *                                                             If (true), the value from 'key' property is used as index.
     *
     * @return {ArrayLike<T>} The new array.
     */
    toLookup<TKey extends PropertyKey>(keySelector: Selector<T, TKey> | string, keyEqualityComparer?: EqualityComparer<TKey> | string): ILookup<T, TKey>;
    /**
     * Creates a new set collection from that sequence.
     *
     * @param {EqualityComparer<T> | string} [comparer] The comparer for the items.
     *
     * @return {IList<T>} The new set.
     */
    toSet(comparer?: EqualityComparer<T> | string): ISet<T>;
    /**
     * Produces the set union of that sequence and another.
     *
     * @param {Sequence<T>} other The other sequence.
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    union(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /**
     * Filters the items of that sequence.
     *
     * @param {Predciate<T> | string} predicate The predicate to use.
     *
     * @return {IEnumerable<T>} The new sequence.
     */
    where(predicate: Predciate<T> | string): IEnumerable<T>;
    /**
     * Applies a specified function to the corresponding elements of that sequence and another,
     * producing a sequence of the results.
     *
     * @param {Sequence<T>} other The other sequence.
     * @param {Zipper<T, TTarget> | string} zipper The selector for the combined result items of the elements of the two sequences.
     *
     * @return IEnumerable<TTarget> The new sequence.
     */
    zip<TTarget>(other: Sequence<T>, zipper: Zipper<T, T, TTarget> | string): IEnumerable<TTarget>;
}
/**
 * Describes an enumerator.
 */
export interface IEnumerator<T> extends Iterator<T> {
    /**
     * Gets if the enumerator can be resetted or not.
     */
    readonly canReset: boolean;
    /**
     * Gets the current element.
     */
    readonly current: T;
    /**
     * Gets if the 'moveNext()' can be called or not.
     */
    readonly isValid: boolean;
    /**
     * Gets the current key.
     */
    readonly key: number;
    /**
     * Moves to the next element.
     *
     * @return New element is available or not.
     */
    moveNext(): boolean;
    /**
     * Resets the enumerator.
     *
     * @chainable
     *
     * @throws Cannot be resetted.
     */
    reset(): IEnumerator<T>;
}
/**
 * An enumerator that is based on an iterator.
 */
export declare class IteratorEnumerator<T> implements IEnumerator<T> {
    /**
     * The current result.
     */
    protected _current: IteratorResult<T>;
    /**
     * The current zero based index.
     */
    protected _index: number;
    /**
     * The underlying iterator.
     */
    protected _iterator: Iterator<T>;
    /**
     * Initializes a new instance of that class.
     *
     * @param {Iterator<T>} [iterator] The underlying iterator.
     */
    constructor(iterator?: Iterator<T>);
    /** @inheritdoc */
    readonly canReset: boolean;
    /** @inheritdoc */
    readonly current: T;
    /** @inheritdoc */
    readonly isValid: boolean;
    /** @inheritdoc */
    readonly key: number;
    /** @inheritdoc */
    moveNext(): boolean;
    /** @inheritdoc */
    next(): IteratorResult<T>;
    /** @inheritdoc */
    reset(): IEnumerator<T>;
}
/**
 * An enumerator that is based on an array.
 */
export declare class ArrayEnumerator<T> extends IteratorEnumerator<T> {
    /**
     * The underlying array.
     */
    protected _arr: ArrayLike<T>;
    /**
     * Initializes a new instance of that class.
     *
     * @param {ArrayLike<T>} [arr] The underlying array.
     */
    constructor(arr?: ArrayLike<T>);
    /** @inheritdoc */
    readonly canReset: boolean;
    /** @inheritdoc */
    reset(): IEnumerator<T>;
}
/**
 * A grouping of items.
 */
export interface IGrouping<T, TKey> extends IEnumerable<T> {
    /**
     * Gets the value that represents the key / group.
     */
    readonly key: TKey;
}
/**
 * Describes the context of an item.
 */
export interface IItemContext<T> {
    /**
     * Cancel operation or not.
     */
    cancel: boolean;
    /**
     * Gets the underlying enumerator.
     */
    readonly enumerator: IEnumerator<T>;
    /**
     * Gets the current zero-based index.
     */
    readonly index: number;
    /**
     * Gets if the that item is the first one or not.
     */
    readonly isFirst: boolean;
    /**
     * Gets the item.
     */
    readonly item: T;
    /**
     * Gets or sets the value for the next item.
     */
    nextValue: any;
    /**
     * Gets the value of the previous item.
     */
    readonly previousValue: any;
    /**
     * Gets or sets the value for the current item and the upcoming ones.
     */
    value: any;
}
/**
 * Describes an ordered sequence.
 */
export interface IOrderedEnumerable<T> extends IEnumerable<T> {
    /**
     * Performs a subsequent ordering of the elements in that sequence in ascending order,
     * using the values itself as keys.
     *
     * @param {Comparer<T> | string} [comparer] The custom key comparer to use.
     *
     * @throws The comparer is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    then(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
    /**
     * Performs a subsequent ordering of the elements in that sequence in ascending order, according to a key.
     *
     * @param {Selector<T, TKey> | string} selector The key selector.
     * @param {Comparer<TKey> | string} [comparer] The custom comparer to use.
     *
     * @throws At least one argument is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    thenBy<TKey>(selector: Selector<T, TKey> | string, comparer?: Comparer<TKey> | string): IOrderedEnumerable<T>;
    /**
     * Performs a subsequent ordering of the elements in that sequence in descending order, according to a key.
     *
     * @param {Selector<T, TKey> | string} selector The key selector.
     * @param {Comparer<TKey> | string} [comparer] The custom comparer to use.
     *
     * @throws At least one argument is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    thenByDescending<TKey>(selector: Selector<T, TKey> | string, comparer?: Comparer<TKey> | string): IOrderedEnumerable<T>;
    /**
     * Performs a subsequent ordering of the elements in that sequence in descending order,
     * using the values as keys.
     *
     * @param {Comparer<T> | string} [comparer] The custom key comparer to use.
     *
     * @throws The comparer is invalid.
     *
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    thenDescending(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
}
/**
 * Describes a lookup object.
 */
export interface ILookup<T, TKey extends PropertyKey> extends IEnumerable<IGrouping<T, TKey>>, Object {
}
/**
 * Describes a collection.
 */
export interface ICollection<T> extends IEnumerable<T> {
    /**
     * Adds an item.
     *
     * @param {T} item The item to add.
     */
    add(item: T): void;
    /**
     * Adds a list of items.
     *
     * @param {T} ...items The items to add.
     */
    addRange(...items: T[]): void;
    /**
     * Clears the collection.
     */
    clear(item: T): void;
    /**
     * Checks if the collection contains an item.
     *
     * @param {T} item The item to search for.
     *
     * @return {boolean} Contains item or not.
     */
    containsItem(item: T): boolean;
    /**
     * Gets if the collection is readonly or not.
     */
    readonly isReadonly: boolean;
    /**
     * Gets the number of items of the collection.
     */
    readonly length: number;
    /**
     * Alias for 'addRange'().
     *
     * @param {T} ...items The items to add.
     *
     * @return {number} The new length of the collection.
     */
    push(...items: T[]): number;
    /**
     * Removes the first occurrence of an item.
     *
     * @param {T} item The item to remove.
     *
     * @return {boolean} Item has been removed or not or not.
     */
    remove(item: T): boolean;
    /**
     * Removes the all items that match a condition.
     *
     * @param {Predciate<T> | string} predicate The predicate to use.
     *
     * @return {number} The number of removed items.
     */
    removeAll(predicate: Predciate<T> | string): number;
}
/**
 * Describes a set of items.
 */
export interface ISet<T> extends ICollection<T> {
    /**
     * Adds an item.
     *
     * @param {T} item The item to add.
     *
     * @return {boolean} Item was added or not.
     */
    add(item: T): boolean;
    /**
     * Modifies the current set so that it contains only elements that are also in a specified sequence.
     *
     * @param {Sequence<T>} The other sequence.
     *
     * @chainable
     */
    intersectWith(other: Sequence<T>): ISet<T>;
    /**
     * Determines whether the current set is a proper (strict) subset of a specified sequence.
     *
     * @param {Sequence<T>} The other sequence.
     *
     * @return {boolean} Is a proper (strict) subset or not.
     */
    isProperSubsetOf(other: Sequence<T>): boolean;
    /**
     * Determines whether the current set is a proper (strict) superset of a specified sequence.
     *
     * @param {Sequence<T>} The other sequence.
     *
     * @return {boolean} Is a proper (strict) superset or not.
     */
    isProperSupersetOf(other: Sequence<T>): boolean;
    /**
     * Determines whether a set is a subset of a specified sequence.
     *
     * @param {Sequence<T>} The other sequence.
     *
     * @return {boolean} Is a subset or not.
     */
    isSubsetOf(other: Sequence<T>): boolean;
    /**
     * Determines whether the current set is a superset of a specified sequence.
     *
     * @param {Sequence<T>} The other sequence.
     *
     * @return {boolean} Is a superset or not.
     */
    isSupersetOf(other: Sequence<T>): boolean;
    /**
     * Determines whether the current set overlaps with the specified sequence.
     *
     * @param {Sequence<T>} The other sequence.
     *
     * @return {boolean} Do overlap or not.
     */
    overlaps(other: Sequence<T>): boolean;
    /**
     * Determines whether the current set and the specified sequence contain the same elements.
     *
     * @param {Sequence<T>} The other sequence.
     *
     * @return {boolean} Do overlap or not.
     */
    setEquals(other: Sequence<T>): boolean;
    /**
     * Modifies the current set so that it contains only elements that are present either in the current set or in the
     * specified sequence, but not both.
     *
     * @param {Sequence<T>} The other sequence.
     *
     * @chainable
     */
    symmetricExceptWith(other: Sequence<T>): ISet<T>;
    /**
     * Modifies the current set so that it contains all elements that are present in the current set, in the
     * specified sequence, or in both.
     *
     * @param {Sequence<T>} The other sequence.
     *
     * @chainable
     */
    unionWith(other: Sequence<T>): ISet<T>;
}
/**
 * Describes a list.
 */
export interface IList<T> extends ICollection<T> {
    /**
     * Returns an item at a specific position.
     *
     * @param {number} index The zero based index.
     *
     * @return {T} The item.
     */
    getItem(index: number): T;
    /**
     * Returns the index of the first occurrence of an item.
     *
     * @param {T} item The item to search for.
     *
     * @return {number} The zero based index or -1 if NOT found.
     */
    indexOf(item: T): number;
    /**
     * Inserts an item at a specific position.
     *
     * @param {number} index The zero based index.
     * @param {T} item The item to insert.
     */
    insert(index: number, item: T): void;
    /**
     * Removes an item at a specific position.
     *
     * @param {number} index The zero based index.
     *
     * @return {boolean} Item has been remove or not.
     */
    removeAt(index: number): boolean;
    /**
     * Sets an item at a specific position.
     *
     * @param {number} index The zero based index.
     * @param {T} item The item to set,
     *
     * @chainable
     */
    setItem(index: number, item: T): IList<T>;
}
/**
 * A basic sequence.
 */
export declare class Enumerable<T> implements IEnumerable<T> {
    /**
     * The underyling iterator.
     */
    protected _enumerator: IEnumerator<T>;
    /**
     * Initializes a new instance of that class.
     *
     * @param {Iterator<T>} [iterator] The underyling iterator.
     */
    constructor(iterator?: Iterator<T>);
    /** @inheritdoc */
    aggregate<TResult, TDefault>(aggregator: Aggregator<T, TResult> | string, defaultValue?: TDefault): TResult | TDefault;
    /** @inheritdoc */
    all(predicate: Predciate<T> | string): boolean;
    /** @inheritdoc */
    any(predicate?: Predciate<T> | string): boolean;
    /** @inheritdoc */
    average<TDefault>(defaultValue?: TDefault): number | TDefault;
    /** @inheritdoc */
    cast<TTarget>(): IEnumerable<TTarget>;
    /** @inheritdoc */
    concat(other: Sequence<T>): IEnumerable<T>;
    /**
     * The logic for the 'concat()' method.
     *
     * @param {Iterator<T>} other The other sequence.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected concatInner(other: Iterator<T>): Iterator<T>;
    /** @inheritdoc */
    concatToString(defaultValue?: string): string;
    /** @inheritdoc */
    contains(item: any, comparer?: EqualityComparer<T> | string | true): boolean;
    /** @inheritdoc */
    count(predicate?: Predciate<T> | string): number;
    /** @inheritdoc */
    defaultIfEmpty(...args: T[]): IEnumerable<T>;
    /**
     * The logic for the 'defaultIfEmpty()' method.
     *
     * @param {T[]} args The arguments for the "default" sequence.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected defaultIfEmptyInner(args: T[]): Iterator<T>;
    /** @inheritdoc */
    distinct(comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /**
     * The logic for the 'distinct()' method.
     *
     * @param {EqualityComparer<T>} comparer The equality comparer.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected distinctInner(comparer: EqualityComparer<T>): Iterator<T>;
    /** @inheritdoc */
    each(action: Action<T>): void;
    /** @inheritdoc */
    elementAt(index: number): T;
    /** @inheritdoc */
    elementAtOrDefault<TDefault>(index: number, defaultValue?: TDefault): T | TDefault;
    /** @inheritdoc */
    except(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /**
     * The logic for the 'except()' method.
     *
     * @param {ArrayLike<T>} itemsToExcept The items to except.
     * @param {EqualityComparer<T>} equalityComparer The equality comparer.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected exceptInner(itemsToExcept: ArrayLike<T>, equalityComparer: EqualityComparer<T>): Iterator<T>;
    /** @inheritdoc */
    first(predicate?: Predciate<T> | string): T;
    /** @inheritdoc */
    firstOrDefault<TDefault>(predicateOrDefaultValue?: Predciate<T> | string | TDefault, defaultValue?: TDefault): T | TDefault;
    /** @inheritdoc */
    forEach(action: Action<T>): void;
    /** @inheritdoc */
    getEnumerator(): IEnumerator<T>;
    /** @inheritdoc */
    groupBy<TKey>(keySelector: Selector<T, TKey> | string, keyEqualityComparer?: EqualityComparer<TKey> | string): IEnumerable<IGrouping<T, TKey>>;
    /** @inheritdoc */
    groupJoin<TInner, TKey, TResult>(inner: Sequence<TInner>, outerKeySelector: Selector<T, TKey> | string, innerKeySelector: Selector<TInner, TKey> | string, resultSelector: Zipper<T, IEnumerable<TInner>, TResult> | string, comparer?: EqualityComparer<TKey> | string): IEnumerable<TResult>;
    /**
     * The logic for the 'groupJoin()' method.
     *
     * @param {Sequence<TInner>} inner The other sequence.
     * @param {Selector<T, TKey>} outerKeySelector The key selector for the items of that sequence.
     * @param {Selector<TInner, TKey>} innerKeySelector The key selector for the items of the other sequence.
     * @param {Zipper<T, IEnumerable<TInner>, TResult>} resultSelector 	The function that provides the result value for two matching elements.
     * @param {EqualityComparer<TKey>} [comparer] The custom key comparer.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected groupJoinInner<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: Selector<T, TKey>, innerKeySelector: Selector<TInner, TKey>, resultSelector: Zipper<T, IEnumerable<TInner>, TResult>, keyEqualityComparer?: EqualityComparer<TKey>): Iterator<TResult>;
    /** @inheritdoc */
    intersect(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /**
     * The logic for the 'intersect()' method.
     *
     * @param {T[]} other The other items.
     * @param {IEnumerable<T>} equalityComparer The equality comparer.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected intersectInner(other: IEnumerable<T>, equalityComparer: EqualityComparer<T>): Iterator<T>;
    /** @inheritdoc */
    [Symbol.iterator](): IEnumerator<T>;
    /** @inheritdoc */
    join<TInner, TKey, TResult>(inner: Sequence<TInner>, outerKeySelector: Selector<T, TKey> | string, innerKeySelector: Selector<TInner, TKey> | string, resultSelector: Zipper<T, TInner, TResult> | string, comparer?: EqualityComparer<TKey> | string): IEnumerable<TResult>;
    /**
     * The logic for the 'join()' method.
     *
     * @param {Sequence<TInner>} inner The other sequence.
     * @param {Selector<T, TKey>} outerKeySelector The key selector for the items of that sequence.
     * @param {Selector<TInner, TKey>} innerKeySelector The key selector for the items of the other sequence.
     * @param {Zipper<T, TInner, TResult>} resultSelector 	The function that provides the result value for two matching elements.
     * @param {EqualityComparer<TKey>} [comparer] The custom key comparer.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected joinInner<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: Selector<T, TKey>, innerKeySelector: Selector<TInner, TKey>, resultSelector: Zipper<T, TInner, TResult>, keyEqualityComparer?: EqualityComparer<TKey>): Iterator<TResult>;
    /** @inheritdoc */
    joinToString(separator: string, defaultValue?: string): string;
    /** @inheritdoc */
    last(predicate?: Predciate<T> | string): T;
    /** @inheritdoc */
    lastOrDefault<TDefault>(predicateOrDefaultValue?: Predciate<T> | string | TDefault, defaultValue?: TDefault): T | TDefault;
    /** @inheritdoc */
    max<TDefault>(defaultValue?: TDefault): T | TDefault;
    /** @inheritdoc */
    min<TDefault>(defaultValue?: TDefault): T | TDefault;
    /** @inheritdoc */
    notEmpty(): IEnumerable<T>;
    /** @inheritdoc */
    ofType<TTarget>(type: string): IEnumerable<TTarget>;
    /** @inheritdoc */
    order(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
    /** @inheritdoc */
    orderBy<TKey>(selector: Selector<T, TKey> | string, comparer?: Comparer<TKey> | string): IOrderedEnumerable<T>;
    /** @inheritdoc */
    orderByDescending<TKey>(selector: Selector<T, TKey> | string, comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
    /** @inheritdoc */
    orderDescending(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
    /** @inheritdoc */
    pushToArray(arr: T[]): IEnumerable<T>;
    /** @inheritdoc */
    reverse(): IOrderedEnumerable<T>;
    /** @inheritdoc */
    select<TTarget>(selector: Selector<T, TTarget> | string): IEnumerable<TTarget>;
    /**
     * The logic for the 'select()' method.
     *
     * @param {Selector<T, TTarget>} selector The selector.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected selectInner<TTarget>(selector: Selector<T, TTarget>): Iterator<TTarget>;
    /** @inheritdoc */
    selectMany<TTarget>(selector: ManySelector<T, TTarget> | string): IEnumerable<TTarget>;
    /**
     * The logic for the 'selectMany()' method.
     *
     * @param {ManySelector<T, TTarget>} selector The selector.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected selectManyInner<TTarget>(selector: ManySelector<T, TTarget>): Iterator<TTarget>;
    /** @inheritdoc */
    sequenceEqual(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true, keyComparer?: EqualityComparer<any> | string | true): boolean;
    /** @inheritdoc */
    single(predicate?: Predciate<T> | string): T;
    /** @inheritdoc */
    singleOrDefault<U>(predicateOrDefaultValue?: Predciate<T> | string | U, defaultValue?: U): T | U;
    /** @inheritdoc */
    skip(cnt: number): IEnumerable<T>;
    /** @inheritdoc */
    skipLast(): IEnumerable<T>;
    /**
     * The logic for the 'skipLast()' method.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected skipLastInner(): Iterator<T>;
    /** @inheritdoc */
    skipWhile(predicate: Predciate<T> | string): IEnumerable<T>;
    /**
     * The logic for the 'skipWhile()' method.
     *
     * @param {Predciate<T>} predicate The predicate.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected skipWhileInner(predicate: Predciate<T>): Iterator<T>;
    /** @inheritdoc */
    sum<U>(defaultValue?: U): number | U;
    /** @inheritdoc */
    take(cnt: number): IEnumerable<T>;
    /** @inheritdoc */
    takeWhile(predicate: Predciate<T> | string): IEnumerable<T>;
    /**
     * The logic for the 'skipWhile()' method.
     *
     * @param {Predciate<T>} predicate The predicate.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected takeWhileInner(predicate: Predciate<T>): Iterator<T>;
    /** @inheritdoc */
    toArray(keySelector?: KeySelector<number, T, number> | string | true): T[];
    /** @inheritdoc */
    toList(isReadOnly?: boolean, comparer?: EqualityComparer<T> | string): IList<T>;
    /** @inheritdoc */
    toLookup<TKey extends PropertyKey>(keySelector: Selector<T, TKey> | string, keyEqualityComparer?: EqualityComparer<TKey> | string): ILookup<T, TKey>;
    /** @inheritdoc */
    toSet(comparer?: EqualityComparer<T> | string): ISet<T>;
    /** @inheritdoc */
    union(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;
    /** @inheritdoc */
    where(predicate: Predciate<T> | string): IEnumerable<T>;
    /**
     * The logic for the 'where()' method.
     *
     * @param {Predciate<T>} predicate The predicate.
     *
     * @return {Iterator<T>} The iterator.
     */
    protected whereInner(predicate: Predciate<T>): Iterator<T>;
    /** @inheritdoc */
    zip<TTarget>(other: Sequence<T>, zipper: Zipper<T, T, TTarget> | string): IEnumerable<TTarget>;
    /**
     * The logic for the 'zip()' method.
     *
     * @param {Iterator<T>} other The other sequence.
     * @param {Zipper<T, U>} zipper The "zipper".
     *
     * @return {Iterator<U>} The iterator.
     */
    protected zipInner<TTarget>(other: IEnumerator<T>, zipper: Zipper<T, T, TTarget>): Iterator<TTarget>;
}
/**
 * A wrapper for another sequence.
 */
export declare class WrappedEnumerable<T> extends Enumerable<T> {
    /**
     * Stores the wrapped sequence.
     */
    protected _seq: IEnumerable<T>;
    /**
     * Initializes a new instance of that class.
     *
     * @param {IEnumerable<T>} [seq] The sequence to wrap.
     */
    constructor(seq?: IEnumerable<T>);
    /** @inheritdoc */
    [Symbol.iterator](): IEnumerator<T>;
    /**
     * Gets the wrapped sequence.
     */
    readonly sequence: IEnumerable<T>;
}
/**
 * A sequence based on an "array like" object.
 */
export declare class ArrayEnumerable<T> extends Enumerable<T> {
    /**
     * The underlying "array".
     */
    protected _arr: ArrayLike<T>;
    /**
     * Initializes a new instance of that class.
     *
     * @param {ArrayLike<T>} [arr] The underlying "array".
     */
    constructor(arr?: ArrayLike<T>);
    /** @inheritdoc */
    [Symbol.iterator](): IEnumerator<T>;
}
/**
 * A grouping of elements.
 */
export declare class Grouping<T, TKey> extends WrappedEnumerable<T> implements IGrouping<T, TKey> {
    /**
     * Stores the "key"/"group" value.
     */
    protected _key: TKey;
    /**
     * Initializes a new instance of that class.
     *
     * @param {TKey} key The value that represents the group.
     * @param {IEnumerable<T>} seq The sequence with the elements.
     */
    constructor(key: TKey, seq: IEnumerable<T>);
    /** @inheritdoc */
    readonly key: TKey;
}
/**
 * A lookup object.
 */
export declare class Lookup<T, TKey extends PropertyKey> extends WrappedEnumerable<IGrouping<T, TKey>> implements ILookup<T, TKey> {
    /**
     * Initializes a new instance of that class.
     *
     * @param {IEnumerable<IGrouping<T, U>>} [seq] The sequence with the elements.
     */
    constructor(seq?: IEnumerable<IGrouping<T, TKey>>);
}
/**
 * A collection.
 */
export declare class Collection<T> extends ArrayEnumerable<T> implements ICollection<T> {
    /**
     * Stores the equality comparer for the items.
     */
    protected _comparer: EqualityComparer<T>;
    /**
     * Stores the if the collection has changed while the last iteration.
     */
    protected _hasChanged: boolean;
    /**
     * Initializes a new instance of that class.
     *
     * @param {Sequence<T>} [seq] The initial data.
     * @param {EqualityComparer<T> | string} [comparer] The equality comparer for the items.
     */
    constructor(seq?: Sequence<T>, comparer?: EqualityComparer<T> | string);
    /** @inheritdoc */
    add(item: T): void;
    /** @inheritdoc */
    addRange(...items: T[]): void;
    /** @inheritdoc */
    clear(): void;
    /** @inheritdoc */
    containsItem(item: T): boolean;
    /** @inheritdoc */
    getItem(index: number): T;
    /** @inheritdoc */
    readonly isReadonly: boolean;
    /** @inheritdoc */
    readonly length: number;
    /**
     * Invokes a function and marks the collection as changed since last iteration.
     *
     * @param {(coll: Collection<T>) => TResult} [func] The optional function to invoke.
     *
     * @return {TResult} The result of the function.
     */
    protected markAsChanged<TResult>(func?: (coll: Collection<T>) => TResult): TResult;
    /** @inheritdoc */
    push(...items: T[]): number;
    /** @inheritdoc */
    remove(item: T): boolean;
    /** @inheritdoc */
    removeAll(predicate: Predciate<T> | string): number;
    /** @inheritdoc */
    setItem(index: number, item: T): IList<T>;
    /**
     * Throws if collection is read-only.
     *
     * @throws "Collection is read-only!"
     */
    protected throwIfReadOnly(): void;
}
/**
 * A set of items.
 */
export declare class HashSet<T> extends Collection<T> implements ISet<T> {
    /**
     * Initializes a new instance of that class.
     *
     * @param {Sequence<T>} [seq] The initial data.
     * @param {EqualityComparer<T> | string} [comparer] The equality comparer for the items.
     */
    constructor(seq?: Sequence<T>, comparer?: EqualityComparer<T> | string);
    /** @inheritdoc */
    add(item: T): boolean;
    /**
     * Adds an item if not in collection yet.
     *
     * @param {T} item The item to add.
     *
     * @return {boolean} Item was added or not.
     */
    protected addIfNotPresent(item: T): boolean;
    /** @inheritdoc */
    intersectWith(other: Sequence<T>): ISet<T>;
    /** @inheritdoc */
    isProperSubsetOf(other: Sequence<T>): boolean;
    /** @inheritdoc */
    isProperSupersetOf(other: Sequence<T>): boolean;
    /** @inheritdoc */
    isSubsetOf(other: Sequence<T>): boolean;
    /** @inheritdoc */
    isSupersetOf(other: Sequence<T>): boolean;
    /** @inheritdoc */
    overlaps(other: Sequence<T>): boolean;
    /** @inheritdoc */
    setEquals(other: Sequence<T>): boolean;
    /** @inheritdoc */
    symmetricExceptWith(other: Sequence<T>): ISet<T>;
    /** @inheritdoc */
    unionWith(other: Sequence<T>): ISet<T>;
}
/**
 * A list.
 */
export declare class List<T> extends Collection<T> implements IList<T> {
    /** @inheritdoc */
    indexOf(item: T): number;
    /** @inheritdoc */
    insert(index: number, item: T): void;
    /** @inheritdoc */
    removeAt(index: number): boolean;
}
/**
 * A readonly collection / list.
 */
export declare class ReadOnlyCollection<T> extends List<T> {
    /** @inheritdoc */
    readonly isReadonly: boolean;
}
/**
 * An ordered sequence.
 */
export declare class OrderedEnumerable<T, U> extends Enumerable<T> implements IOrderedEnumerable<T> {
    /**
     * Stores the comparer for the sort operation.
     */
    protected _orderComparer: Comparer<U>;
    /**
     * Stores the array of items in original order.
     */
    protected _originalItems: T[];
    /**
     * Stores the sort value selector.
     */
    protected _orderSelector: Selector<T, U>;
    /**
     * Initializes a new instance of that class.
     *
     * @param {IEnumerable<T>} seq The source sequence.
     * @param {Selector<T, U> | string} selector The selector for the sort values.
     * @param {Comparer<U> | string} comparer The comparer to use.
     */
    constructor(seq: IEnumerable<T>, selector: Selector<T, U> | string, comparer: Comparer<U> | string);
    /**
     * Gets the comparer.
     */
    readonly comparer: Comparer<U>;
    /**
     * Gets the selector.
     */
    readonly selector: Selector<T, U>;
    /** @inheritdoc */
    then(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
    /** @inheritdoc */
    thenBy<TKey>(selector: Selector<T, TKey> | string, comparer?: Comparer<TKey> | string): IOrderedEnumerable<T>;
    /** @inheritdoc */
    thenByDescending<TKey>(selector: Selector<T, TKey> | string, comparer?: Comparer<TKey> | string): IOrderedEnumerable<T>;
    /** @inheritdoc */
    thenDescending(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
}
/**
 * Creates a new sequence.
 *
 * @param {ArrayLike<T> | Iterator} [items] The underlying items.
 *
 * @return {IEnumerable<T>} The new sequence.
 */
export declare function from<T>(items?: Sequence<T>): IEnumerable<T>;
