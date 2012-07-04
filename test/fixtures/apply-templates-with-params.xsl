<xsl:apply-templates select="some" mode="mode">
    <xsl:with-param name="param1" select="val1"></xsl:with-param>
    <xsl:with-param name="param1" select="val2"/>
</xsl:apply-templates>
