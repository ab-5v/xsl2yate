<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:key name="filter-field" match="/page/filters/filters-data/fields/item" use="@value"/>

    <xsl:key name="attachment" match="/*/message-body/attachments/attachment[inline]" use="@cid"/>

    <xsl:variable name="attachment" select="$attachments/attachment[not(inline) and (string(name) or message)]"/>

    <xsl:variable name="param-extra-cond" select="$params/extra_cond"/>

    <xsl:variable name="label-current" select="key('labels', $param-label)"/>

    <xsl:variable name="wait" select="$labels/label[name = 'about:blank']"/>

    <xsl:variable name="message-id" select="/*/message/@id | /attached-message/params/ids | /message-attachments/mid"/>

    <xsl:variable name="folder-1lvl-nested" select="count($folders/folder[user]) > 1"/>

    <xsl:variable name="folder-draft" select="key('folders', 'draft')"/>
    <xsl:variable name="folder-draft-id" select="$folder-draft/@id"/>

</xsl:stylesheet>

