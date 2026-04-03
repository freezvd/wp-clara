import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'grain-section-editor',
	} );

	return (
		<div { ...blockProps }>
			<div className="grain-canvas-placeholder" aria-hidden="true" />
			<InnerBlocks />
		</div>
	);
}
