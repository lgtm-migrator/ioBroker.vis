import PropTypes from 'prop-types';
import I18n from '@iobroker/adapter-react-v5/i18n';
import copy from 'copy-to-clipboard';
import AceEditor from 'react-ace';

import FileCopyIcon from '@mui/icons-material/FileCopy';

import IODialog from '../Components/IODialog';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-clouds_midnight';
import 'ace-builds/src-noconflict/theme-chrome';

const WidgetExportDialog = props => {
    const widgets = props.selectedWidgets.map(selectedWidget => props.widgets[selectedWidget]);
    const groupWidgets = [];
    widgets.forEach(widget => {
        if (widget.tpl === '_tplGroup') {
            widget.data.members.forEach(member => {
                if (groupWidgets.includes(member)) {
                    return;
                }
                const memberWidget = JSON.parse(JSON.stringify(props.widgets[member]));
                memberWidget.groupName = member;
                widgets.push(memberWidget);
                groupWidgets.push(member);
            });
        }
    });
    return <IODialog
        open={props.open}
        onClose={props.onClose}
        title={I18n.t('Export widgets')}
        closeTitle="Close"
        action={() => copy(JSON.stringify(widgets, null, 2))}
        actionTitle="Copy to clipboard"
        actionNoClose
        ActionIcon={FileCopyIcon}
    >
        <AceEditor
            mode="json"
            theme={props.themeName === 'dark' ? 'clouds_midnight' : 'chrome'}
            value={JSON.stringify(widgets, null, 2)}
            height="200px"
        />
    </IODialog>;
};

WidgetExportDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    themeName: PropTypes.string,
    widgets: PropTypes.array,
};

export default WidgetExportDialog;
