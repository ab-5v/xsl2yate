<?xml version="1.0" encoding="utf-8"?>

<!DOCTYPE xsl:stylesheet [
<!ENTITY % blocks.ent SYSTEM "../blocks.ent"> %blocks.ent;
<!ENTITY % images.ent SYSTEM "../images.ent"> %images.ent;
]>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="order">
    <xsl:text>Text</xsl:text>
</xsl:template>

<xsl:template match="order" mode="url-content">
    <xsl:apply-templates select="ask" mode="order"></xsl:apply-templates>
    <xsl:text>Another Text</xsl:text>
</xsl:template>

</xsl:stylesheet>
