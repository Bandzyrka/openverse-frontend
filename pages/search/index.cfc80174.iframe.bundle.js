(window.webpackJsonp=window.webpackJsonp||[]).push([[199,7,8,13,16,200],{1321:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var runtime=__webpack_require__(2),VButton=__webpack_require__(46),components_VLoadMorevue_type_script_lang_js_=Object(runtime.b)({name:"VLoadMore",components:{VButton:VButton.default},props:{isFetching:{type:Boolean,default:!0}},setup:function setup(props,_ref){var emit=_ref.emit,i18n=Object(runtime.p)().i18n;return{buttonLabel:Object(runtime.a)((function(){return i18n.t("browse-page.load")})),onLoadMore:function onLoadMore(){emit("onLoadMore")}}}}),componentNormalizer=__webpack_require__(7),component=Object(componentNormalizer.a)(components_VLoadMorevue_type_script_lang_js_,(function(){var _h=this.$createElement;return(this._self._c||_h)("VButton",{attrs:{size:"large",variant:"full",type:"button",disabled:this.isFetching},on:{click:this.onLoadMore}},[this._v("\n  "+this._s(this.buttonLabel)+"\n")])}),[],!1,null,null,null);const __vuedocgen_export_0=component.exports;__webpack_exports__.default=__vuedocgen_export_0;installComponents(component,{VButton:__webpack_require__(46).default}),__vuedocgen_export_0.__docgenInfo={displayName:"VLoadMore",exportName:"default",description:"",tags:{},props:[{name:"isFetching",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}]}},1329:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(15);var VLink=__webpack_require__(57),VLicense=__webpack_require__(101),errorImage=__webpack_require__(1360),toAbsolutePath=function toAbsolutePath(url){var prefix=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"https://";return url.indexOf("http://")>=0||url.indexOf("https://")>=0?url:"".concat(prefix).concat(url)},VAllResultsGrid_VImageCellSquarevue_type_script_lang_js_={name:"VImageCell",components:{VLink:VLink.default,VLicense:VLicense.default},props:["image"],methods:{getImageUrl:function getImageUrl(image){if(!image)return"";var url=image.thumbnail||image.url;return toAbsolutePath(url)},getImageForeignUrl:function getImageForeignUrl(image){return toAbsolutePath(image.foreign_landing_url)},onImageLoadError:function onImageLoadError(event,image){var element=event.target;element.src!==image.url?element.src=image.url:element.src=errorImage},onFocusLeave:function onFocusLeave(event){this.$emit("focus-leave",event)}}},componentNormalizer=__webpack_require__(7),component=Object(componentNormalizer.a)(VAllResultsGrid_VImageCellSquarevue_type_script_lang_js_,(function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("VLink",{staticClass:"group block focus:ring-[3px] focus:ring-pink focus:ring-offset-[3px] focus:outline-none rounded-sm",attrs:{itemprop:"contentUrl",title:_vm.image.title,href:"/image/"+_vm.image.id}},[_c("figure",{staticClass:"aspect-square relative rounded-sm",attrs:{itemprop:"image",itemscope:"",itemtype:"https://schema.org/ImageObject"}},[_c("img",{ref:"img",staticClass:"w-full h-full object-cover rounded-sm bg-dark-charcoal-10 text-dark-charcoal-10",attrs:{loading:"lazy",alt:_vm.image.title,src:_vm.getImageUrl(_vm.image),width:250,height:250,itemprop:"thumbnailUrl"},on:{error:function($event){return _vm.onImageLoadError($event,_vm.image)}}}),_vm._v(" "),_c("figcaption",{staticClass:"absolute left-0 bottom-0 invisible group-hover:visible group-focus:visible bg-white p-1 text-dark-charcoal"},[_c("span",{staticClass:"sr-only"},[_vm._v(_vm._s(_vm.image.title))]),_vm._v(" "),_c("VLicense",{attrs:{license:_vm.image.license,"hide-name":!0}})],1)])])}),[],!1,null,null,null);const __vuedocgen_export_0=component.exports;__webpack_exports__.default=__vuedocgen_export_0;installComponents(component,{VLicense:__webpack_require__(101).default,VLink:__webpack_require__(57).default}),__vuedocgen_export_0.__docgenInfo={displayName:"VImageCell",exportName:"default",description:"",tags:{},props:[{name:"image",type:{name:"undefined"}}],events:[{name:"focus-leave",type:{names:["undefined"]}}]}},1330:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var runtime=__webpack_require__(2),vue_composition_api_esm=__webpack_require__(18),VAudioTrack=__webpack_require__(188),VAllResultsGrid_VAudioCellvue_type_script_lang_js_=Object(vue_composition_api_esm.defineComponent)({components:{VAudioTrack:VAudioTrack.default},props:["audio"],setup:function setup(){var app=Object(runtime.p)().app,router=Object(runtime.t)();return{navigateToSinglePage:function navigateToSinglePage(audio){router.push(app.localePath({path:"/audio/".concat(audio.id)}))}}}}),componentNormalizer=__webpack_require__(7),component=Object(componentNormalizer.a)(VAllResultsGrid_VAudioCellvue_type_script_lang_js_,(function(){var _h=this.$createElement;return(this._self._c||_h)("VAudioTrack",{attrs:{audio:this.audio,layout:"box"},on:{boxedAudioClick:this.navigateToSinglePage}})}),[],!1,null,null,null);const __vuedocgen_export_0=component.exports;__webpack_exports__.default=__vuedocgen_export_0;installComponents(component,{VAudioTrack:__webpack_require__(188).default}),__vuedocgen_export_0.__docgenInfo={exportName:"default",displayName:"VAudioCell",description:"",tags:{},props:[{name:"audio",type:{name:"undefined"}}]}},1341:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(4),__webpack_require__(23),__webpack_require__(6),__webpack_require__(35),__webpack_require__(16),__webpack_require__(32),__webpack_require__(19),__webpack_require__(29),__webpack_require__(11),__webpack_require__(36),__webpack_require__(8),__webpack_require__(206),__webpack_require__(72),__webpack_require__(28);var runtime=__webpack_require__(2),prng=__webpack_require__(498),VImageCellSquare=__webpack_require__(1329),VAudioCell=__webpack_require__(1330),VLoadMore=__webpack_require__(1321),VContentLink=__webpack_require__(254),VGridSkeleton=__webpack_require__(211);function _createForOfIteratorHelper(o,allowArrayLike){var it="undefined"!=typeof Symbol&&o[Symbol.iterator]||o["@@iterator"];if(!it){if(Array.isArray(o)||(it=function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(o))||allowArrayLike&&o&&"number"==typeof o.length){it&&(o=it);var i=0,F=function F(){};return{s:F,n:function n(){return i>=o.length?{done:!0}:{done:!1,value:o[i++]}},e:function e(_e){throw _e},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var err,normalCompletion=!0,didErr=!1;return{s:function s(){it=it.call(o)},n:function n(){var step=it.next();return normalCompletion=step.done,step},e:function e(_e2){didErr=!0,err=_e2},f:function f(){try{normalCompletion||null==it.return||it.return()}finally{if(didErr)throw err}}}}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var VAllResultsGrid_VAllResultsGridvue_type_script_lang_js_=Object(runtime.b)({name:"VAllResultsGrid",components:{VImageCellSquare:VImageCellSquare.default,VAudioCell:VAudioCell.default,VLoadMore:VLoadMore.default,VGridSkeleton:VGridSkeleton.default,VContentLink:VContentLink.default},props:["canLoadMore"],setup:function setup(_,_ref){var emit=_ref.emit,_useContext=Object(runtime.p)(),i18n=_useContext.i18n,store=_useContext.store,resultsLoading=Object(runtime.a)((function(){return Boolean(store.getters["media/fetchState"].fetchingError)||store.getters["media/fetchState"].isFetching})),allMedia=Object(runtime.a)((function(){var media=store.getters["media/mediaResults"],mediaKeys=Object.keys(media),seed=Object.keys(media[mediaKeys[0]])[0];"string"==typeof seed&&(seed=Object(prng.a)(seed));for(var rand=Object(prng.b)(seed),randomIntegerInRange=function randomIntegerInRange(min,max){return Math.floor(rand()*(max-min+1))+min},newResults=[],_i=0,_Object$keys=Object.keys(media.image||{});_i<_Object$keys.length;_i++){var id=_Object$keys[_i],item=media.image[id];item.frontendMediaType="image",newResults.push(item)}var _step,nonImageIndex=1,_iterator=_createForOfIteratorHelper(Object.keys(media).slice(1));try{for(_iterator.s();!(_step=_iterator.n()).done;)for(var type=_step.value,_i2=0,_Object$keys2=Object.keys(media[type]);_i2<_Object$keys2.length;_i2++){var _id=_Object$keys2[_i2],_item=media[type][_id];if(_item.frontendMediaType=type,newResults.splice(nonImageIndex,0,_item),nonImageIndex>newResults.length+1)break;nonImageIndex=randomIntegerInRange(nonImageIndex+1,nonImageIndex+6)}}catch(err){_iterator.e(err)}finally{_iterator.f()}return newResults})),isError=Object(runtime.a)((function(){return!!store.getters["media/fetchState"].fetchingError})),fetchState=Object(runtime.a)((function(){return store.getters["media/fetchState"]})),errorHeader=Object(runtime.a)((function(){var type=i18n.t("browse-page.search-form.audio");return i18n.t("browse-page.fetching-error",{type:type})})),results=Object(runtime.a)((function(){return Object.entries(store.getters["media/results"])})),noResults=Object(runtime.a)((function(){return fetchState.value.isFinished&&0===allMedia.value.length}));return{isError:isError,errorHeader:errorHeader,allMedia:allMedia,onLoadMore:function onLoadMore(){emit("load-more")},fetchState:fetchState,resultsLoading:resultsLoading,results:results,noResults:noResults}}}),componentNormalizer=__webpack_require__(7),component=Object(componentNormalizer.a)(VAllResultsGrid_VAllResultsGridvue_type_script_lang_js_,(function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",[_vm.noResults?_vm._e():_c("div",{staticClass:"results-grid grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 gap-4 mb-4"},_vm._l(_vm.results,(function(ref){var key=ref[0],item=ref[1];return _c("VContentLink",{key:key,staticClass:"lg:col-span-2",attrs:{"media-type":key,"results-count":item.count,to:_vm.localePath({path:"/search/"+key,query:_vm.$route.query})}})})),1),_vm._v(" "),_vm.resultsLoading&&0===_vm.allMedia.length?_c("VGridSkeleton",{attrs:{"is-for-tab":"all"}}):_c("div",{staticClass:"results-grid grid grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 gap-4"},_vm._l(_vm.allMedia,(function(item){return _c("div",{key:item.id},["image"===item.frontendMediaType?_c("VImageCellSquare",{key:item.id,attrs:{image:item}}):_vm._e(),_vm._v(" "),"audio"===item.frontendMediaType?_c("VAudioCell",{key:item.id,attrs:{audio:item}}):_vm._e()],1)})),0),_vm._v(" "),_vm.isError?[_c("h5",[_vm._v(_vm._s(_vm.errorHeader))]),_vm._v(" "),_c("p",[_vm._v(_vm._s(_vm.fetchState.fetchingError))])]:_vm._e(),_vm._v(" "),_vm.canLoadMore&&!_vm.fetchState.isFinished?_c("VLoadMore",{staticClass:"mt-4",attrs:{"is-fetching":_vm.resultsLoading,"data-testid":"load-more"},on:{onLoadMore:_vm.onLoadMore}}):_vm._e()],2)}),[],!1,null,null,null);const __vuedocgen_export_0=component.exports;__webpack_exports__.default=__vuedocgen_export_0;installComponents(component,{VContentLink:__webpack_require__(254).default,VGridSkeleton:__webpack_require__(211).default,VImageCellSquare:__webpack_require__(1329).default,VAudioCell:__webpack_require__(1330).default,VLoadMore:__webpack_require__(1321).default}),__vuedocgen_export_0.__docgenInfo={displayName:"VAllResultsGrid",exportName:"default",description:"",tags:{},props:[{name:"canLoadMore",type:{name:"undefined"}}]}},1360:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"img/image_not_available_placeholder.8bfa6bb.png"},1370:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"propTypes",(function(){return propTypes}));var propTypes={mediaResults:{type:Object,required:!0},fetchState:{type:Object,required:!0},isFilterVisible:{type:Boolean,required:!1},searchTerm:{type:String,required:!0},supported:{type:Boolean,required:!1}}},1376:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return useLoadMore}));__webpack_require__(12),__webpack_require__(8),__webpack_require__(150),__webpack_require__(15);var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(33),_nuxtjs_composition_api__WEBPACK_IMPORTED_MODULE_7__=(__webpack_require__(75),__webpack_require__(6),__webpack_require__(2)),_constants_action_types__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(49),_constants_store_modules__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(94),useLoadMore=function useLoadMore(props){var store=Object(_nuxtjs_composition_api__WEBPACK_IMPORTED_MODULE_7__.p)().store,searchParams=Object(_nuxtjs_composition_api__WEBPACK_IMPORTED_MODULE_7__.a)((function(){var pages={};return Object.keys(props.mediaResults).forEach((function(key){var _props$mediaResults$k,mediaPage=(null===(_props$mediaResults$k=props.mediaResults[key])||void 0===_props$mediaResults$k?void 0:_props$mediaResults$k.page)||0;pages[key]=mediaPage?mediaPage+1:void 0})),{page:pages,shouldPersistMedia:!0}})),canLoadMore=Object(_nuxtjs_composition_api__WEBPACK_IMPORTED_MODULE_7__.a)((function(){return""!==props.searchTerm.trim()})),onLoadMore=function(){var _ref=Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__.a)(regeneratorRuntime.mark((function _callee(){return regeneratorRuntime.wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:if(!canLoadMore.value){_context.next=3;break}return _context.next=3,store.dispatch("".concat(_constants_store_modules__WEBPACK_IMPORTED_MODULE_9__.a,"/").concat(_constants_action_types__WEBPACK_IMPORTED_MODULE_8__.c),searchParams.value);case 3:case"end":return _context.stop()}}),_callee)})));return function onLoadMore(){return _ref.apply(this,arguments)}}();return{canLoadMore:canLoadMore,onLoadMore:onLoadMore}}},1710:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var runtime=__webpack_require__(2),search_page_types=__webpack_require__(1370),use_load_more=__webpack_require__(1376),VAllResultsGrid=__webpack_require__(1341),pages_searchvue_type_script_lang_js_=Object(runtime.b)({name:"SearchIndex",components:{VAllResultsGrid:VAllResultsGrid.default},props:search_page_types.propTypes,setup:function setup(props){Object(runtime.r)({title:"".concat(props.searchTerm," | Openverse")});var _useLoadMore=Object(use_load_more.a)(props);return{canLoadMore:_useLoadMore.canLoadMore,onLoadMore:_useLoadMore.onLoadMore}},head:{meta:[{hid:"robots",name:"robots",content:"noindex"}]}}),componentNormalizer=__webpack_require__(7),component=Object(componentNormalizer.a)(pages_searchvue_type_script_lang_js_,(function(){var _h=this.$createElement;return(this._self._c||_h)("VAllResultsGrid",{attrs:{"can-load-more":this.canLoadMore},on:{"load-more":this.onLoadMore}})}),[],!1,null,null,null);const __vuedocgen_export_0=component.exports;__webpack_exports__.default=__vuedocgen_export_0;installComponents(component,{VAllResultsGrid:__webpack_require__(1341).default}),__vuedocgen_export_0.__docgenInfo={displayName:"SearchIndex",exportName:"default",description:"",tags:{}}}}]);